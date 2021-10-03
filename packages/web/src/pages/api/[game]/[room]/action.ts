import { ApiError } from "lib/api/error"
import { handle, readBody, readParam } from "lib/api/server"
import { getUserId } from "lib/api/server/auth"
import { GenericHttpResponse, HttpMethod, HttpStatus } from "lib/api/types"
import { getClientRef, getServerRef } from "lib/db/collections"
import { firestore } from "lib/firebase/admin"
import { getGameApi } from "lib/games/api"
import { GameAction, GameState, GameType, isGameType } from "lib/games/types"
import { toError } from "lib/utils/error"
import { Param } from "lib/utils/navigation"

export async function playerAction<T extends GameType>(
  userId: string,
  game: T,
  roomId: string,
  action: Record<string, unknown>
): Promise<GenericHttpResponse> {
  const success = await firestore.runTransaction(async transaction => {
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

    if (!gameState.playerOrder.includes(userId)) {
      throw new ApiError(
        HttpStatus.NOT_AUTHORIZED,
        "You are not a player in this game"
      )
    }

    const { validatePlayerAction, resolveState, resolvePlayerAction } =
      getGameApi(game)

    let validatedAction: GameAction<T>

    try {
      validatedAction = validatePlayerAction(gameState, userId, action)
    } catch (error) {
      throw new ApiError(HttpStatus.BAD_REQUEST, toError(error).message)
    }

    let nextState = gameState

    nextState = await resolvePlayerAction(nextState, userId, validatedAction)

    transaction.update(clientRef, nextState)

    nextState = await resolveState(nextState)

    transaction.update(serverRef, nextState)

    return true
  })

  return { success }
}

export default handle({
  [HttpMethod.POST]: async request => {
    const userId = await getUserId(request)
    const game = readParam(request, Param.GAME_TYPE)

    if (!isGameType(game)) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        `Invalid parameter '${Param.GAME_TYPE}'`
      )
    }

    const roomId = readParam(request, Param.ROOM_ID)
    const action = readBody<Record<string, unknown>>(request)
    return playerAction(userId, game, roomId, action)
  },
})
