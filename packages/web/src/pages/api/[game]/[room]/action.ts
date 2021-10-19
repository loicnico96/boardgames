import { BaseAction } from "@boardgames/common"

import { ApiError } from "lib/api/error"
import { handle, readBody, readParam } from "lib/api/server"
import { getUserId } from "lib/api/server/auth"
import { GenericHttpResponse, HttpMethod, HttpStatus } from "lib/api/types"
import { getClientRef, getServerRef } from "lib/db/collections"
import { firestore } from "lib/firebase/admin"
import { getGameContext } from "lib/games/context"
import { GameState, GameType, isGameType } from "lib/games/types"
import { toError } from "lib/utils/error"
import { Param } from "lib/utils/navigation"

export async function playerAction<T extends GameType>(
  userId: string,
  game: T,
  roomId: string,
  action: BaseAction
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

    const context = getGameContext(game, gameState)

    const player = context.player(userId)

    if (player.ready) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "You cannot perform this action now"
      )
    }

    try {
      context.setAction(userId, context.validateAction(userId, action))
    } catch (error) {
      throw new ApiError(HttpStatus.BAD_REQUEST, toError(error).message)
    }

    transaction.update(clientRef, context.state)

    if (!context.isWaitingForAction()) {
      await context.resolve()
    }

    transaction.update(serverRef, context.state)

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
    const action = readBody<BaseAction>(request)
    return playerAction(userId, game, roomId, action)
  },
})
