import { any, record } from "@boardgames/utils"
import update from "immutability-helper"
import { ApiError } from "next/dist/server/api-utils"

import { getUserId } from "lib/api/server/auth"
import { handle, readBody, readParam } from "lib/api/server/handle"
import { GenericHttpResponse, HttpMethod, HttpStatus } from "lib/api/types"
import { DocRef, firestore } from "lib/firebase/admin"
import { WithId } from "lib/firebase/firestore"
import { GameType } from "lib/games/types"
import { getRoomRef } from "lib/model/collections"
import { RoomData, RoomStatus } from "lib/model/RoomData"
import { RouteParam } from "lib/utils/navigation"

type RoomUpdate<T extends GameType> = Pick<RoomData<T>, "options">

export async function deleteRoom(
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
        "This game has already started"
      )
    }

    if (roomData.createdBy !== userId) {
      throw new ApiError(
        HttpStatus.NOT_AUTHORIZED,
        "Only the owner of the room can close it"
      )
    }

    transaction.delete(roomRef)

    return true
  })

  return { success }
}

export async function updateRoom<T extends GameType>(
  userId: string,
  roomId: string,
  roomUpdate: RoomUpdate<T>
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
        "Room can only be updated by its owner"
      )
    }

    const updatedData = update(roomData, {
      options: {
        $merge: roomUpdate.options,
      },
    })

    transaction.set(roomRef, updatedData)

    return { ...updatedData, id: roomId }
  })
}

export default handle({
  [HttpMethod.DELETE]: async request => {
    const userId = await getUserId(request)
    const roomId = readParam(request, RouteParam.ROOM)
    return deleteRoom(userId, roomId)
  },
  [HttpMethod.PATCH]: async request => {
    const userId = await getUserId(request)
    const roomId = readParam(request, RouteParam.ROOM)
    const roomUpdate = readBody(request, { options: record(any()) })
    return updateRoom(userId, roomId, roomUpdate)
  },
})
