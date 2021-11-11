import { RoborallyModel } from "@boardgames/roborally"

import { CacaoModel } from "./cacao/model"
import { MetropolysModel } from "./metropolys/model"
import { PapayooModel } from "./papayoo/model"

export enum GameType {
  CACAO = "cacao",
  METROPOLYS = "metropolys",
  PAPAYOO = "papayoo",
  ROBORALLY = "roborally",
}

export type GameModels = {
  cacao: CacaoModel
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
