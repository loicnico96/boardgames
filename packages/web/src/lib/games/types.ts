import { MetropolysModel } from "./metropolys/model"
import { PapayooModel } from "./papayoo/model"
import { RoborallyModel } from "./roborally/model"

export type Games = {
  metropolys: MetropolysModel
  papayoo: PapayooModel
  roborally: RoborallyModel
}

export type GameType = keyof Games

export type GameAction<T extends GameType = GameType> = Games[T]["action"]
export type GameEvent<T extends GameType = GameType> = Games[T]["event"]
export type GameOptions<T extends GameType = GameType> = Games[T]["options"]
export type GameState<T extends GameType = GameType> = Games[T]["state"]

export function isGameType(value: unknown): value is GameType {
  return ["metropolys", "papayoo", "roborally"].includes(value as string)
}
