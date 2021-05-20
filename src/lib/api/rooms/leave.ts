import { ApiError } from "lib/api/error"
import { HttpStatus } from "lib/api/types"
import { getRoomRef } from "lib/db/collections"
import { FieldValue, firestore } from "lib/firebase/admin"
import { RoomData, RoomStatus } from "lib/model/RoomData"

export type ApiRequestLeaveRoom = {
  roomId: string
}

export type ApiResponseLeaveRoom = {
  success: true
}

export async function leaveRoom(
  roomId: string,
  userId: string
): Promise<ApiResponseLeaveRoom> {
  await firestore.runTransaction(async transaction => {
    const roomRef = firestore.doc(getRoomRef(roomId))
    const roomDoc = await transaction.get(roomRef)
    const roomData = roomDoc.data() as RoomData | undefined
    if (!roomData) {
      throw new ApiError(
        HttpStatus.NOT_FOUND,
        "This room does not exist or has been closed"
      )
    }

    if (roomData.status !== RoomStatus.OPENED) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "The game has already started"
      )
    }

    if (roomData.ownerId === userId) {
      throw new ApiError(
        HttpStatus.NOT_AUTHORIZED,
        "You are the owner of this room"
      )
    }

    if (!roomData.playerOrder.includes(userId)) {
      throw new ApiError(
        HttpStatus.NOT_AUTHORIZED,
        "You are not a player in this room"
      )
    }

    transaction.update(roomRef, {
      playerOrder: FieldValue.arrayRemove(userId),
      players: {
        [userId]: FieldValue.delete(),
      },
    })
  })

  return { success: true }
}
