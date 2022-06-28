import { RoomData as BaseRoom } from "@boardgames/common"
import { isEnum } from "@boardgames/utils"

import { MetropolysModel } from "./metropolys/context"
import { RoborallyModel } from "./roborally/context"

export enum GameType {
  METROPOLYS = "metropolys",
  ROBORALLY = "roborally",
}

export type GameModel<T extends GameType = GameType> = {
  metropolys: MetropolysModel
  roborally: RoborallyModel
}[T]

export type GameAction<T extends GameType> = GameModel<T>["action"]
export type GameEvent<T extends GameType> = GameModel<T>["event"]
export type GameOptions<T extends GameType> = GameModel<T>["options"]
export type GameState<T extends GameType> = GameModel<T>["state"]

export type RoomData<T extends GameType = GameType> = BaseRoom<T, GameModel<T>>

export function isGameType(value: unknown): value is GameType {
  return isEnum(value, GameType)
}
