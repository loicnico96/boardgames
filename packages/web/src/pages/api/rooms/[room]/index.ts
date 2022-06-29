import { RoomStatus } from "@boardgames/common"
import { any, record, toError } from "@boardgames/utils"
import update from "immutability-helper"
import { ApiError } from "next/dist/server/api-utils"

import { getUserId } from "lib/api/server/auth"
import { getRoomDocRef } from "lib/api/server/db"
import { handle, readBody, readParam } from "lib/api/server/handle"
import { GenericHttpResponse, HttpMethod, HttpStatus } from "lib/api/types"
import { firestore } from "lib/firebase/admin"
import { WithId } from "lib/firebase/firestore"
import { getGameDefinition } from "lib/games/definitions"
import { GameOptions, GameType, RoomData } from "lib/games/types"
import { RouteParam } from "lib/utils/navigation"

type RoomUpdate<T extends GameType> = Pick<RoomData<T>, "options">

export async function deleteRoom<T extends GameType>(
  userId: string,
  roomId: string
): Promise<GenericHttpResponse> {
  const success = await firestore.runTransaction(async transaction => {
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

    if (roomData.createdBy !== userId) {
      throw new ApiError(
        HttpStatus.NOT_AUTHORIZED,
        "Room can only be updated by its owner"
      )
    }

    const { game } = roomData
    const { validateOptions } = getGameDefinition(game)

    let updatedOptions: GameOptions<T>

    try {
      updatedOptions = validateOptions({
        ...roomData.options,
        ...roomUpdate.options,
      })
    } catch (error) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        `Invalid room options: ${toError(error).message}`
      )
    }

    const updatedData = update(roomData, {
      options: { $set: updatedOptions },
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
