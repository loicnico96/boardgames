import { GameType } from "lib/games/types"

export type GameData<T extends GameType = GameType> = {
  game: T
  players: Record<string, unknown> // TODO
}
