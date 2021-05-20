import { ApiError } from "lib/api/error"
import { HttpStatus } from "lib/api/types"
import { getRoomRef } from "lib/db/collections"
import { FieldValue, firestore } from "lib/firebase/admin"
import { RoomData, RoomStatus } from "lib/model/RoomData"

import { getUserInfo } from "../auth"

export type ApiRequestEnterRoom = {
  roomId: string
}

export type ApiResponseEnterRoom = {
  success: true
}

export async function enterRoom(
  roomId: string,
  userId: string
): Promise<ApiResponseEnterRoom> {
  await firestore.runTransaction(async transaction => {
    const { userName } = await getUserInfo(userId)

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

    if (roomData.playerOrder.includes(userId)) {
      throw new ApiError(
        HttpStatus.NOT_AUTHORIZED,
        "You are already a player in this room"
      )
    }

    transaction.update(roomRef, {
      playerOrder: FieldValue.arrayUnion(userId),
      players: {
        [userId]: {
          name: userName,
        },
      },
    })
  })

  return { success: true }
}
