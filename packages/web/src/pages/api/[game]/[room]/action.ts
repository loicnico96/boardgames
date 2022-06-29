import { BaseAction, GameContext, RoomStatus } from "@boardgames/common"
import { string, toError } from "@boardgames/utils"
import { UpdateData } from "firebase/firestore"
import { ApiError } from "next/dist/server/api-utils"

import { getUserId } from "lib/api/server/auth"
import {
  getClientDocRef,
  getRoomDocRef,
  getServerDocRef,
} from "lib/api/server/db"
import { handle, readBody, readParam } from "lib/api/server/handle"
import { GenericHttpResponse, HttpMethod, HttpStatus } from "lib/api/types"
import { firestore } from "lib/firebase/admin"
import { getGameDefinition } from "lib/games/definitions"
import {
  GameAction,
  GameData,
  GameType,
  isGameType,
  RoomData,
} from "lib/games/types"
import { RouteParam } from "lib/utils/navigation"

export async function playerAction<T extends GameType>(
  userId: string,
  game: T,
  roomId: string,
  action: BaseAction
): Promise<GenericHttpResponse> {
  const success = await firestore.runTransaction(async transaction => {
    const clientRef = getClientDocRef(game, roomId)
    const serverRef = getServerDocRef(game, roomId)
    const serverDoc = await transaction.get(serverRef)
    const serverData = serverDoc.data()

    if (!serverData) {
      throw new ApiError(HttpStatus.NOT_FOUND, "This game is not ongoing")
    }

    const { resolveState, validateAction } = getGameDefinition(game)

    const seed = Date.now()

    const context = new GameContext({ ...serverData, seed })

    if (context.isEnded()) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "This game has already ended"
      )
    }

    if (!context.state.playerOrder.includes(userId)) {
      throw new ApiError(
        HttpStatus.NOT_AUTHORIZED,
        "You are not a player in this game"
      )
    }

    if (context.player(userId).ready) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "You cannot perform this action now"
      )
    }

    let validatedAction: GameAction<T>

    try {
      validatedAction = validateAction(context.state, userId, action)
    } catch (error) {
      throw new ApiError(HttpStatus.BAD_REQUEST, toError(error).message)
    }

    context.setAction(userId, validatedAction)

    transaction.update(clientRef, context.data as UpdateData<GameData<T>>)

    if (context.isReady()) {
      await resolveState(context)
    }

    transaction.update(serverRef, context.data as UpdateData<GameData<T>>)

    if (context.isEnded()) {
      const roomRef = getRoomDocRef<T>(roomId)
      transaction.update(roomRef, { status: RoomStatus.FINISHED } as UpdateData<
        RoomData<T>
      >)
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
