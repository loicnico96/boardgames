import { GameSettings } from "@boardgames/common"

import { MetropolysSettings } from "./metropolys/settings"
import { RoborallySettings } from "./roborally/settings"
import { Games, GameType } from "./types"

const GAMES: {
  [T in GameType]: GameSettings<Games[T]>
} = {
  metropolys: MetropolysSettings,
  roborally: RoborallySettings,
}

export function getGameSettings<T extends GameType>(
  gameType: T
): GameSettings<Games[T]> {
  return GAMES[gameType]
}
