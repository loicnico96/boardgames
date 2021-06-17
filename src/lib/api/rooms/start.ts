import { ApiError } from "lib/api/error"
import { HttpStatus } from "lib/api/types"
import { getClientRef, getRoomRef, getServerRef } from "lib/db/collections"
import { DocumentData } from "lib/db/types"
import { firestore } from "lib/firebase/admin"
import { getGameSettings } from "lib/games/GameSettings"
import { RoomData, RoomStatus } from "lib/model/RoomData"

export type ApiRequestStartGame = {
  roomId: string
}

export type ApiResponseStartGame = {
  success: true
}

export async function startGame(
  roomId: string,
  userId: string
): Promise<ApiResponseStartGame> {
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
        "You are not the owner of this room"
      )
    }

    const { getInitialGameState } = getGameSettings(roomData.game)

    const fetchData = <D extends DocumentData>(docId: string): Promise<D> =>
      transaction.get(firestore.doc(docId)).then(doc => doc.data() as D)

    const initialGameData = getInitialGameState(roomData, fetchData)
    const clientRef = getClientRef(roomData.game, roomId)
    const serverRef = getServerRef(roomData.game, roomId)

    transaction.create(firestore.doc(clientRef), initialGameData)
    transaction.create(firestore.doc(serverRef), initialGameData)
    transaction.update(roomRef, { status: RoomStatus.ONGOING })
  })

  return { success: true }
}
