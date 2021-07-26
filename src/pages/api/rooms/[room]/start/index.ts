import { ApiError } from "lib/api/error"
import { handle, readParam } from "lib/api/server"
import { getUserId } from "lib/api/server/auth"
import { HttpMethod, HttpStatus } from "lib/api/types"
import { getClientRef, getRoomRef, getServerRef } from "lib/db/collections"
import { DocumentData } from "lib/db/types"
import { firestore } from "lib/firebase/admin"
import { getGameSettings } from "lib/games/GameSettings"
import { RoomData, RoomStatus } from "lib/model/RoomData"
import { Param } from "lib/utils/navigation"

export async function startGame(userId: string, roomId: string): Promise<void> {
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

    const { getInitialGameState, minPlayers } = getGameSettings(roomData.game)

    if (roomData.playerOrder.length < minPlayers) {
      throw new ApiError(
        HttpStatus.FAILED_PRECONDITION,
        "This room does not have enough players"
      )
    }

    const fetchData = <D extends DocumentData>(docId: string): Promise<D> =>
      transaction.get(firestore.doc(docId)).then(doc => doc.data() as D)

    const initialGameData = await getInitialGameState(roomData, fetchData)
    const clientRef = getClientRef(roomData.game, roomId)
    const serverRef = getServerRef(roomData.game, roomId)

    transaction.create(firestore.doc(clientRef), initialGameData)
    transaction.create(firestore.doc(serverRef), initialGameData)
    transaction.update(roomRef, { status: RoomStatus.ONGOING })
  })
}

export default handle({
  [HttpMethod.POST]: async (request, logger) => {
    const userId = await getUserId(request, logger)
    const roomId = readParam(request, Param.ROOM_ID)
    await startGame(userId, roomId)
    return { success: true }
  },
})
