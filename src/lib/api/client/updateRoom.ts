import { GameType } from "lib/games/GameType"
import { RoomData } from "lib/model/RoomData"

import { HttpClient } from "./HttpClient"

export type WritableFields = "options"

export async function updateRoom<T extends GameType>(
  roomId: string,
  room: Pick<RoomData<T>, WritableFields>
): Promise<void> {
  await HttpClient.patch(`/api/rooms/${roomId}`, room)
}
