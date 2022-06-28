import {
  BaseAction,
  getClientRef,
  getRoomRef,
  getServerRef,
  RoomStatus,
} from "@boardgames/common"
import { string, toError } from "@boardgames/utils"
import { ApiError } from "next/dist/server/api-utils"

import { getUserId } from "lib/api/server/auth"
import { handle, readBody, readParam } from "lib/api/server/handle"
import { GenericHttpResponse, HttpMethod, HttpStatus } from "lib/api/types"
import { firestore } from "lib/firebase/admin"
import { getGameContext } from "lib/games/context"
import { GameState, GameType, isGameType } from "lib/games/types"
import { RouteParam } from "lib/utils/navigation"

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
      throw new ApiError(HttpStatus.NOT_FOUND, "This game is not ongoing")
    }

    if (gameState.finished) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "This game has already ended"
      )
    }

    if (!gameState.playerOrder.includes(userId)) {
      throw new ApiError(
        HttpStatus.NOT_AUTHORIZED,
        "You are not a player in this game"
      )
    }

    const context = getGameContext(game)

    context.setState(gameState)

    if (context.player(userId).ready) {
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

    context.setSeed(Date.now())

    transaction.update(clientRef, context.state)

    await context.resolveState()

    transaction.update(serverRef, context.state)

    if (context.state.finished) {
      const roomRef = firestore.doc(getRoomRef(roomId))
      transaction.update(roomRef, { status: RoomStatus.FINISHED })
    }

    return true
  })

  return { success }
}

export default handle({
  [HttpMethod.POST]: async request => {
    const userId = await getUserId(request)
    const game = readParam(request, RouteParam.GAME)
    const roomId = readParam(request, RouteParam.ROOM)

    if (!isGameType(game)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, "Unknown game type")
    }

    const action = readBody(request, { code: string() })
    return playerAction(userId, game, roomId, action)
  },
})
