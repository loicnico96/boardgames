import update from "immutability-helper"

import { ApiError } from "lib/api/error"
import { handle, readParam } from "lib/api/server"
import { getUserId, getUserInfo } from "lib/api/server/auth"
import { GenericHttpResponse, HttpMethod, HttpStatus } from "lib/api/types"
import { getRoomRef } from "lib/db/collections"
import { DocRef, firestore } from "lib/firebase/admin"
import { SETTINGS } from "lib/games/settings"
import { RoomData, RoomStatus } from "lib/model/RoomData"
import { Param } from "lib/utils/navigation"

export async function enterRoom(
  userId: string,
  roomId: string
): Promise<GenericHttpResponse> {
  const { userName } = await getUserInfo(userId)

  if (!userName) {
    throw new ApiError(
      HttpStatus.FAILED_PRECONDITION,
      "You must set an username in order to create or join rooms"
    )
  }

  const success = await firestore.runTransaction(async transaction => {
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

    const { maxPlayers } = SETTINGS[roomData.game]

    if (roomData.playerOrder.length >= maxPlayers) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "This room is already full"
      )
    }

    transaction.update(
      roomRef,
      update(roomData, {
        playerOrder: {
          $push: [userId],
        },
        players: {
          [userId]: {
            $set: {
              name: userName,
            },
          },
        },
      })
    )

    return true
  })

  return { success }
}

export default handle({
  [HttpMethod.POST]: async request => {
    const userId = await getUserId(request)
    const roomId = readParam(request, Param.ROOM_ID)
    return enterRoom(userId, roomId)
  },
})
