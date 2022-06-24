import update from "immutability-helper"
import { ApiError } from "next/dist/server/api-utils"

import { getUserId } from "lib/api/server/auth"
import { handle, readParam } from "lib/api/server/handle"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { DocRef, firestore } from "lib/firebase/admin"
import { WithId } from "lib/firebase/firestore"
import { getRoomRef } from "lib/model/collections"
import { RoomData, RoomStatus } from "lib/model/RoomData"
import { RouteParam } from "lib/utils/navigation"

export async function startGame(
  userId: string,
  roomId: string
): Promise<WithId<RoomData>> {
  return firestore.runTransaction(async transaction => {
    const roomRef = firestore.doc(getRoomRef(roomId)) as DocRef<RoomData>
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

    const minPlayers = 2 // TODO
    const maxPlayers = 4 // TODO

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
      status: {
        $set: RoomStatus.ONGOING,
      },
    })

    transaction.set(roomRef, updatedData)

    // TODO

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
