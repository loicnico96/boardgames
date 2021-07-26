import { ApiError } from "lib/api/error"
import { handle, readBody, readParam } from "lib/api/server"
import { getUserId } from "lib/api/server/auth"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { getRoomRef } from "lib/db/collections"
import { firestore } from "lib/firebase/admin"
import { GameOptions, getGameSettings } from "lib/games/GameSettings"
import { RoomData, RoomStatus } from "lib/model/RoomData"
import { Param } from "lib/utils/navigation"
import { ObjectRecord } from "lib/utils/objects"
import { object, record } from "lib/utils/validation"

export async function closeRoom(userId: string, roomId: string): Promise<void> {
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

    if (roomData.ownerId !== userId) {
      throw new ApiError(
        HttpStatus.NOT_AUTHORIZED,
        "You are not the owner of this room"
      )
    }

    transaction.delete(roomRef)
  })
}

export async function updateRoom(
  userId: string,
  roomId: string,
  options: ObjectRecord
): Promise<void> {
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

    if (roomData.ownerId !== userId) {
      throw new ApiError(
        HttpStatus.NOT_AUTHORIZED,
        "You are not the owner of this room"
      )
    }

    const { validateOptions } = getGameSettings(roomData.game)

    let validatedOptions: GameOptions

    try {
      validatedOptions = validateOptions({
        ...roomData.options,
        ...options,
      })
    } catch (error) {
      throw new ApiError(HttpStatus.BAD_REQUEST, error.message)
    }

    transaction.update(roomRef, { options: validatedOptions })
  })
}

export default handle({
  [HttpMethod.DELETE]: async (request, logger) => {
    const userId = await getUserId(request, logger)
    const roomId = readParam(request, Param.ROOM_ID)
    await closeRoom(userId, roomId)
    return { success: true }
  },
  [HttpMethod.PATCH]: async (request, logger) => {
    const userId = await getUserId(request, logger)
    const roomId = readParam(request, Param.ROOM_ID)
    const { options } = readBody(request, object({ options: record() }))
    await updateRoom(userId, roomId, options)
    return { success: true }
  },
})
