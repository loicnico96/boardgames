import { GameType } from "lib/games/GameType"
import { object, string } from "lib/utils/validation"

import { HttpClient } from "./HttpClient"

export type CreateRoomResponse = {
  roomId: string
}

export async function createRoom(game: GameType): Promise<CreateRoomResponse> {
  const data = await HttpClient.post("/api/rooms/create", { game })
  return object({ roomId: string() })(data)
}
