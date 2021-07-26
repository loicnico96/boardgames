import { GameAction } from "lib/games/GameSettings"
import { GameType } from "lib/games/GameType"

import { HttpClient } from "./HttpClient"

export async function playerAction<T extends GameType>(
  game: T,
  roomId: string,
  action: GameAction<T>
): Promise<void> {
  await HttpClient.post(`/api/${game}/${roomId}/action`, action)
}
