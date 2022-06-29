import {
  RoomData as BaseRoomData,
  GameData as BaseGameData,
} from "@boardgames/common"
import { MetropolysModel } from "@boardgames/metropolys"
import { RoborallyModel } from "@boardgames/roborally"
import { isEnum } from "@boardgames/utils"

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
export type GameData<T extends GameType> = BaseGameData<GameState<T>>

export type RoomData<T extends GameType = GameType> = BaseRoomData<
  T,
  GameOptions<T>
>

export function isGameType(value: unknown): value is GameType {
  return isEnum(value, GameType)
}
