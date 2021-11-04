import { toError } from "@boardgames/utils"

import { ApiError } from "lib/api/error"
import { handle, readBody, readParam } from "lib/api/server"
import { getUserId } from "lib/api/server/auth"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { getRoomRef } from "lib/db/collections"
import { WithId } from "lib/db/types"
import { DocRef, firestore } from "lib/firebase/admin"
import { getGameContext } from "lib/games/context"
import { GameOptions, GameType } from "lib/games/types"
import { RoomData, RoomStatus } from "lib/model/RoomData"
import { Param } from "lib/utils/navigation"

export type RoomUpdate<T extends GameType = GameType> = {
  options: Partial<GameOptions<T>>
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

    if (roomData.ownerId !== userId) {
      throw new ApiError(
        HttpStatus.NOT_AUTHORIZED,
        "You are not the owner of this room"
      )
    }

    const context = getGameContext(roomData.game)

    let validatedOptions: GameOptions<T>

    try {
      validatedOptions = context.validateOptions({
        ...roomData.options,
        ...roomUpdate.options,
      })
    } catch (error) {
      throw new ApiError(HttpStatus.BAD_REQUEST, toError(error).message)
    }

    transaction.update(roomRef, { options: validatedOptions })

    return { ...roomData, options: validatedOptions, id: roomId }
  })
}

export default handle({
  [HttpMethod.PATCH]: async request => {
    const userId = await getUserId(request)
    const roomId = readParam(request, Param.ROOM_ID)
    const roomUpdate = readBody<RoomUpdate>(request)
    return updateRoom(userId, roomId, roomUpdate)
  },
})
