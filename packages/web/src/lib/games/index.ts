import { GameSettings } from "@boardgames/common"

import { RoborallyModel, RoborallySettings } from "./roborally"

type Games = {
  roborally: RoborallyModel
}

const GAMES: {
  [T in GameType]: GameSettings<Games[T]>
} = {
  roborally: RoborallySettings,
}

export type GameType = keyof Games

export type GameAction<T extends GameType = GameType> = Games[T]["action"]
export type GameEvent<T extends GameType = GameType> = Games[T]["event"]
export type GameOptions<T extends GameType = GameType> = Games[T]["options"]
export type GameState<T extends GameType = GameType> = Games[T]["state"]

export function getGameSettings<T extends GameType>(
  gameType: T
): GameSettings<Games[T]> {
  return GAMES[gameType]
}

export function isGameType(value: unknown): value is GameType {
  return Object.keys(GAMES).includes(value as string)
}
