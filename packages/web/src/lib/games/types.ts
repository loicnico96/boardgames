import { MetropolysModel } from "./metropolys/model"
import { PapayooModel } from "./papayoo/model"
import { RoborallyModel } from "./roborally/model"

export enum GameType {
  METROPOLYS = "metropolys",
  PAPAYOO = "papayoo",
  ROBORALLY = "roborally",
}

export type Games = {
  metropolys: MetropolysModel
  papayoo: PapayooModel
  roborally: RoborallyModel
}

export type GameAction<T extends GameType = GameType> = Games[T]["action"]
export type GameEvent<T extends GameType = GameType> = Games[T]["event"]
export type GameOptions<T extends GameType = GameType> = Games[T]["options"]
export type GameState<T extends GameType = GameType> = Games[T]["state"]

export function isGameType(value: unknown): value is GameType {
  return Object.values(GameType).includes(value as GameType)
}
