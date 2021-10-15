import { Action, Event, Options, State } from "@boardgames/common"

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

export type Game<T extends GameType> = Games[T]

export type GameAction<T extends GameType> = Action<Game<T>>
export type GameEvent<T extends GameType> = Event<Game<T>>
export type GameOptions<T extends GameType> = Options<Game<T>>
export type GameState<T extends GameType> = State<Game<T>>

export function isGameType(value: unknown): value is GameType {
  return Object.values(GameType).includes(value as GameType)
}
