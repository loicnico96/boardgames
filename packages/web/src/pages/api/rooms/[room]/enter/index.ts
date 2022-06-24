import update from "immutability-helper"
import { ApiError } from "next/dist/server/api-utils"

import { getUserId, getUserInfo } from "lib/api/server/auth"
import { handle, readParam } from "lib/api/server/handle"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { DocRef, firestore } from "lib/firebase/admin"
import { WithId } from "lib/firebase/firestore"
import { getRoomRef } from "lib/model/collections"
import { RoomData, RoomStatus } from "lib/model/RoomData"
import { RouteParam } from "lib/utils/navigation"

export async function enterRoom(
  userId: string,
  roomId: string
): Promise<WithId<RoomData>> {
  const { userName } = await getUserInfo(userId)

  if (!userName) {
    throw new ApiError(
      HttpStatus.FAILED_PRECONDITION,
      "You must set an username in order to create or join rooms"
    )
  }

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

    if (roomData.playerOrder.includes(userId)) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "You have already joined this room"
      )
    }

    const maxPlayers = 4 // TODO

    if (roomData.playerOrder.length >= maxPlayers) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "This room is already full"
      )
    }

    const updatedData = update(roomData, {
      playerOrder: {
        $push: [userId],
      },
      players: {
        $merge: {
          [userId]: {
            name: userName,
          },
        },
      },
    })

    transaction.set(roomRef, updatedData)

    return { ...updatedData, id: roomId }
  })
}

export default handle({
  [HttpMethod.POST]: async request => {
    const userId = await getUserId(request)
    const roomId = readParam(request, RouteParam.ROOM)
    return enterRoom(userId, roomId)
  },
})
