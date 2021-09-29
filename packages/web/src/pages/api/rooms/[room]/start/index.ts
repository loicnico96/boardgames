import { ApiError } from "lib/api/error"
import { handle, readParam } from "lib/api/server"
import { getUserId } from "lib/api/server/auth"
import { GenericHttpResponse, HttpMethod, HttpStatus } from "lib/api/types"
import { getClientRef, getRoomRef, getServerRef } from "lib/db/collections"
import { DocRef, firestore } from "lib/firebase/admin"
import { getGameSettings } from "lib/games"
import { RoomData, RoomStatus } from "lib/model/RoomData"
import { Param } from "lib/utils/navigation"

export async function startGame(
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
        "This room doesn't have enough players"
      )
    }

    const initialGameState = getInitialGameState(
      roomData.players,
      roomData.playerOrder,
      roomData.options
    )

    const clientRef = firestore.doc(getClientRef(roomData.game, roomId))
    const serverRef = firestore.doc(getServerRef(roomData.game, roomId))

    transaction.create(clientRef, initialGameState)
    transaction.create(serverRef, initialGameState)
    transaction.update(roomRef, { status: RoomStatus.ONGOING })

    return true
  })

  return { success }
}

export default handle({
  [HttpMethod.POST]: async request => {
    const userId = await getUserId(request)
    const roomId = readParam(request, Param.ROOM_ID)
    return startGame(userId, roomId)
  },
})
