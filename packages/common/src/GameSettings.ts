import { GameModel } from "./GameModel"

export type GameSettings<M extends GameModel> = {
  defaultOptions: M["options"]
  minPlayers: number
  maxPlayers: number
}
