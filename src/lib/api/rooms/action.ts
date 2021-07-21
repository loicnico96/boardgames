import { ApiError } from "lib/api/error"
import { HttpStatus } from "lib/api/types"
import { getClientRef, getServerRef } from "lib/db/collections"
import { firestore } from "lib/firebase/admin"
import { GameAction, GameState, getGameSettings } from "lib/games/GameSettings"
import { GameType } from "lib/games/GameType"

export type ApiRequestGameAction = {
  game: GameType
  roomId: string
  action: unknown
}

export type ApiResponseGameAction = {
  success: true
}

export type GameData<T extends GameType = GameType> = {
  game: T
  state: GameState<T>
}

export async function playerAction<T extends GameType>(
  game: T,
  roomId: string,
  userId: string,
  action: unknown
): Promise<ApiResponseGameAction> {
  await firestore.runTransaction(async transaction => {
    const clientRef = getClientRef(game, roomId)
    const serverRef = getServerRef(game, roomId)
    const serverDoc = await transaction.get(firestore.doc(serverRef))
    const serverData = serverDoc.data() as GameData<T> | undefined
    if (!serverData) {
      throw new ApiError(
        HttpStatus.NOT_FOUND,
        "This room does not exist or has been closed"
      )
    }

    const { resolvePlayerAction, resolveState, validateAction } =
      getGameSettings(game)

    let gameState = serverData.state
    let validatedAction: GameAction<T>

    try {
      validatedAction = validateAction(gameState, userId, action)
    } catch (error) {
      throw new ApiError(HttpStatus.BAD_REQUEST, error.message)
    }

    gameState = await resolvePlayerAction(gameState, userId, validatedAction)

    transaction.update(firestore.doc(clientRef), { state: gameState })

    gameState = await resolveState(gameState)

    transaction.update(firestore.doc(serverRef), { state: gameState })
  })

  return { success: true }
}
