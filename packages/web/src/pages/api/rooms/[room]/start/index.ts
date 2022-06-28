import {
  getClientRef,
  getGameRef,
  getRef,
  getRoomRef,
  getServerRef,
  RoomStatus,
} from "@boardgames/common"
import { assert } from "@boardgames/utils"
import update from "immutability-helper"
import { ApiError } from "next/dist/server/api-utils"

import { getUserId } from "lib/api/server/auth"
import { handle, readParam } from "lib/api/server/handle"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { DocRef, firestore } from "lib/firebase/admin"
import { WithId } from "lib/firebase/firestore"
import { getGameContext } from "lib/games/context"
import { getGameSettings } from "lib/games/settings"
import { GameType, RoomData } from "lib/games/types"
import { RouteParam } from "lib/utils/navigation"

export async function startGame<T extends GameType>(
  userId: string,
  roomId: string
): Promise<WithId<RoomData<T>>> {
  return firestore.runTransaction(async transaction => {
    const roomRef = firestore.doc(getRoomRef(roomId)) as DocRef<RoomData<T>>
    const roomDoc = await transaction.get(roomRef)
    const roomData = roomDoc.data()

    if (!roomData) {
      throw new ApiError(
        HttpStatus.NOT_FOUND,
        "This room does not exist or has been closed"
      )
    }

    if (roomData.status !== RoomStatus.OPENED) {
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

    const { maxPlayers, minPlayers } = getGameSettings(roomData.game)

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

    const context = getGameContext(roomData.game)

    const initialState = await context.getInitialGameState(
      roomData,
      Date.now(),
      async <S>(ref: string): Promise<S> => {
        const fullRef = getRef(getGameRef(roomData.game), ref)
        const doc = await firestore.doc(fullRef).get()
        assert(doc.exists, `Not found: ${ref}`)
        return doc.data() as S
      }
    )

    context.setState(initialState)

    const clientRef = firestore.doc(getClientRef(roomData.game, roomId))
    const serverRef = firestore.doc(getServerRef(roomData.game, roomId))

    transaction.create(clientRef, context.state)

    await context.resolveState()

    transaction.create(serverRef, context.state)

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
