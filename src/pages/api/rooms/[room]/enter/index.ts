import { ApiError } from "lib/api/error"
import { handle, readParam } from "lib/api/server"
import { getUserId, getUserInfo } from "lib/api/server/auth"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { getRoomRef } from "lib/db/collections"
import { FieldValue, firestore } from "lib/firebase/admin"
import { RoomData, RoomStatus } from "lib/model/RoomData"
import { Param } from "lib/utils/navigation"

export async function enterRoom(userId: string, roomId: string): Promise<void> {
  await firestore.runTransaction(async transaction => {
    const { userName } = await getUserInfo(userId)

    if (!userName) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "You must set an username in order to create or enter rooms."
      )
    }

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
        HttpStatus.FAILED_PRECONDITION,
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
}

export default handle({
  [HttpMethod.POST]: async (request, logger) => {
    const userId = await getUserId(request, logger)
    const roomId = readParam(request, Param.ROOM_ID)
    await enterRoom(userId, roomId)
    return { success: true }
  },
})
