import { MetropolysModel } from "./metropolys/model"
import { PapayooModel } from "./papayoo/model"
import { RoborallyModel } from "./roborally/model"

export enum GameType {
  METROPOLYS = "metropolys",
  PAPAYOO = "papayoo",
  ROBORALLY = "roborally",
}

export type GameModels = {
  metropolys: MetropolysModel
  papayoo: PapayooModel
  roborally: RoborallyModel
}

export type GameAction<T extends GameType> = GameModels[T]["action"]
export type GameEvent<T extends GameType> = GameModels[T]["event"]
export type GameOptions<T extends GameType> = GameModels[T]["options"]
export type GamePlayer<T extends GameType> = GameModels[T]["player"]
export type GameState<T extends GameType> = GameModels[T]["state"]

export function isGameType(value: unknown): value is GameType {
  return Object.values(GameType).includes(value as GameType)
}
