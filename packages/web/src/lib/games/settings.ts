import { GameSettings } from "@boardgames/common"

import { MetropolysSettings } from "./metropolys/settings"
import { PapayooSettings } from "./papayoo/settings"
import { RoborallySettings } from "./roborally/settings"
import { Games, GameType } from "./types"

const GAMES: {
  [T in GameType]: GameSettings<Games[T]>
} = {
  metropolys: MetropolysSettings,
  papayoo: PapayooSettings,
  roborally: RoborallySettings,
}

export function getGameSettings<T extends GameType>(
  game: T
): GameSettings<Games[T]> {
  return GAMES[game] as GameSettings<any>
}
