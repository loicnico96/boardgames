import { ApiError } from "lib/api/error"
import { handle, readBody, readParam } from "lib/api/server"
import { getUserId } from "lib/api/server/auth"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { getClientRef, getServerRef } from "lib/db/collections"
import { firestore } from "lib/firebase/admin"
import { GameAction, GameState, getGameSettings } from "lib/games/GameSettings"
import { GameType } from "lib/games/GameType"
import { isEnum } from "lib/utils/enums"
import { Param } from "lib/utils/navigation"
import { any } from "lib/utils/validation"

export async function playerAction<T extends GameType>(
  userId: string,
  game: T,
  roomId: string,
  action: unknown
): Promise<void> {
  await firestore.runTransaction(async transaction => {
    const clientRef = firestore.doc(getClientRef(game, roomId))
    const serverRef = firestore.doc(getServerRef(game, roomId))
    const serverDoc = await transaction.get(serverRef)
    const gameState = serverDoc.data() as GameState<T> | undefined
    if (!gameState) {
      throw new ApiError(
        HttpStatus.NOT_FOUND,
        "This room does not exist or has been closed"
      )
    }

    const { validateAction, resolvePlayerAction, resolveState } =
      getGameSettings(game)

    let validatedAction: GameAction<T>

    try {
      validatedAction = validateAction(gameState, userId, action)
    } catch (error) {
      throw new ApiError(HttpStatus.BAD_REQUEST, error.message)
    }

    let nextState = gameState

    nextState = await resolvePlayerAction(nextState, userId, validatedAction)

    transaction.update(clientRef, nextState)

    nextState = await resolveState(nextState)

    transaction.update(serverRef, nextState)
  })
}

export default handle({
  [HttpMethod.POST]: async (request, logger) => {
    const userId = await getUserId(request, logger)
    const game = readParam(request, Param.GAME_TYPE)

    if (!isEnum(game, GameType)) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Unknown game type")
    }

    const roomId = readParam(request, Param.ROOM_ID)
    const action = readBody(request, any())
    await playerAction(userId, game, roomId, action)
    return { success: true }
  },
})
