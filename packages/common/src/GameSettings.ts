import { BaseModel, Options } from "./GameModel"

export type GameSettings<M extends BaseModel> = {
  defaultOptions: Options<M>
  minPlayers: number
  maxPlayers: number
}
