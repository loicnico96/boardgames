import { getUserInfo } from "lib/api/auth"
import { Collection } from "lib/db/collections"
import { firestore } from "lib/firebase/admin"
import { GameType, RoomData, RoomStatus } from "lib/model/RoomData"

export type ApiRequestCreateRoom = {
  game: GameType
}

export type ApiResponseCreateRoom = {
  roomId: string
}

export async function createRoom(
  game: GameType,
  userId: string
): Promise<ApiResponseCreateRoom> {
  const { userName } = await getUserInfo(userId)

  const roomData: RoomData = {
    createdAt: Date.now(),
    game,
    options: {},
    ownerId: userId,
    playerOrder: [userId],
    players: { [userId]: { name: userName } },
    status: RoomStatus.OPENED,
  }

  const doc = await firestore.collection(Collection.ROOMS).add(roomData)

  return { roomId: doc.id }
}
