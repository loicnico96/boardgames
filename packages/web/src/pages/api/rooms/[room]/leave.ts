import { RoomStatus } from "@boardgames/common"
import { remove } from "@boardgames/utils"
import update from "immutability-helper"
import { ApiError } from "next/dist/server/api-utils"

import { getUserId } from "lib/api/server/auth"
import { getRoomDocRef } from "lib/api/server/db"
import { handle, readParam } from "lib/api/server/handle"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { firestore } from "lib/firebase/admin"
import { WithId } from "lib/firebase/firestore"
import { GameType, RoomData } from "lib/games/types"
import { RouteParam } from "lib/utils/navigation"

export async function leaveRoom<T extends GameType>(
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

    if (roomData.createdBy === userId) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "You are the owner of this room"
      )
    }

    if (!roomData.playerOrder.includes(userId)) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "You are not a player in this room"
      )
    }

    const updatedData = update(roomData, {
      playerOrder: playerOrder => remove(playerOrder, userId),
      players: { $unset: [userId] },
    })

    transaction.set(roomRef, updatedData)

    return { ...updatedData, id: roomId }
  })
}

export default handle({
  [HttpMethod.POST]: async request => {
    const userId = await getUserId(request)
    const roomId = readParam(request, RouteParam.ROOM)
    return leaveRoom(userId, roomId)
  },
})
