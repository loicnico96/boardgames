import { ApiError } from "lib/api/error"
import { handle, readParam } from "lib/api/server"
import { getUserId } from "lib/api/server/auth"
import { GenericHttpResponse, HttpMethod, HttpStatus } from "lib/api/types"
import { getRoomRef } from "lib/db/collections"
import { DocRef, FieldValue, firestore } from "lib/firebase/admin"
import { RoomData, RoomStatus } from "lib/model/RoomData"
import { Param } from "lib/utils/navigation"

export async function leaveRoom(
  userId: string,
  roomId: string
): Promise<GenericHttpResponse> {
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
      return false
    }

    transaction.update(roomRef, {
      playerOrder: FieldValue.arrayRemove(userId),
      [`players.${userId}`]: FieldValue.delete(),
    })

    return true
  })

  return { success }
}

export default handle({
  [HttpMethod.POST]: async request => {
    const userId = await getUserId(request)
    const roomId = readParam(request, Param.ROOM_ID)
    return leaveRoom(userId, roomId)
  },
})
