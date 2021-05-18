import { getUserInfo } from "lib/api/auth"
import { Collection } from "lib/db/collections"
import { firestore } from "lib/firebase/admin"
import {
  GameType,
  RoomData,
  RoomId,
  RoomStatus,
  UserId,
} from "lib/model/RoomData"

export type ApiRequestCreateRoom = {
  game: GameType
}

export type ApiResponseCreateRoom = {
  roomId: RoomId
}

export async function createRoom(
  game: GameType,
  ownerId: UserId
): Promise<ApiResponseCreateRoom> {
  const { userName } = await getUserInfo(ownerId)

  const roomData: RoomData = {
    createdAt: Date.now(),
    game,
    options: {},
    ownerId,
    playerOrder: [ownerId],
    players: { [ownerId]: { name: userName } },
    status: RoomStatus.OPENED,
  }

  const doc = await firestore.collection(Collection.ROOMS).add(roomData)

  return { roomId: doc.id }
}
