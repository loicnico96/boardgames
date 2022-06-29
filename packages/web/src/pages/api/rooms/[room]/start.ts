import { GameContext, getGameRef, getRef, RoomStatus } from "@boardgames/common"
import { Random } from "@boardgames/utils"
import update from "immutability-helper"
import { ApiError } from "next/dist/server/api-utils"

import { getUserId } from "lib/api/server/auth"
import {
  getClientDocRef,
  getRoomDocRef,
  getServerDocRef,
} from "lib/api/server/db"
import { handle, readParam } from "lib/api/server/handle"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { firestore } from "lib/firebase/admin"
import { WithId } from "lib/firebase/firestore"
import { getGameDefinition } from "lib/games/definitions"
import { getGameSettings } from "lib/games/settings"
import { GameType, RoomData } from "lib/games/types"
import { RouteParam } from "lib/utils/navigation"

export async function startGame<T extends GameType>(
  userId: string,
  roomId: string
): Promise<WithId<RoomData<T>>> {
  return firestore.runTransaction(async transaction => {
    const roomRef = getRoomDocRef<T>(roomId)
    const roomDoc = await transaction.get(roomRef)
    const roomData = roomDoc.data()

    if (!roomData) {
      throw new ApiError(
        HttpStatus.NOT_FOUND,
        "This room does not exist or has been closed"
      )
    }

    if (roomData.status !== RoomStatus.OPEN) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "This game has already started"
      )
    }

    if (roomData.createdBy !== userId) {
      throw new ApiError(
        HttpStatus.NOT_AUTHORIZED,
        "Only the owner of the room can start the game"
      )
    }

    const { game } = roomData
    const { maxPlayers, minPlayers } = getGameSettings(game)
    const { getInitialGameState, resolveState } = getGameDefinition(game)

    if (roomData.playerOrder.length < minPlayers) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "This room does not have enough players"
      )
    }

    if (roomData.playerOrder.length > maxPlayers) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "This room has too many players"
      )
    }

    const updatedData = update(roomData, {
      status: { $set: RoomStatus.ONGOING },
    })

    transaction.set(roomRef, updatedData)

    const seed = Date.now()
    const generator = new Random(seed)
    const fetcher = async <S>(ref: string): Promise<S> => {
      const fullRef = getRef(getGameRef(roomData.game), ref)
      const doc = await firestore.doc(fullRef).get()
      if (doc.exists) {
        return doc.data() as S
      } else {
        throw new ApiError(HttpStatus.NOT_FOUND, `Not found: ${fullRef}`)
      }
    }

    const state = await getInitialGameState(roomData, generator, fetcher)

    const context = new GameContext({ state, seed })

    const clientRef = getClientDocRef(game, roomId)
    const serverRef = getServerDocRef(game, roomId)

    transaction.create(clientRef, context.data)

    if (context.isReady()) {
      await resolveState(context)
    }

    transaction.create(serverRef, context.data)

    return { ...updatedData, id: roomId }
  })
}

export default handle({
  [HttpMethod.POST]: async request => {
    const userId = await getUserId(request)
    const roomId = readParam(request, RouteParam.ROOM)
    return startGame(userId, roomId)
  },
})
