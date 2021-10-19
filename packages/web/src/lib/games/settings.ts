import { GameSettings } from "@boardgames/common"

import { MetropolysSettings } from "./metropolys/settings"
import { PapayooSettings } from "./papayoo/settings"
import { RoborallySettings } from "./roborally/settings"
import { GameModels, GameType } from "./types"

const SETTINGS: {
  [T in GameType]: GameSettings<GameModels[T]>
} = {
  metropolys: MetropolysSettings,
  papayoo: PapayooSettings,
  roborally: RoborallySettings,
}

export function getGameSettings<T extends GameType>(
  game: T
): GameSettings<GameModels[T]> {
  return SETTINGS[game] as GameSettings<GameModels[T]>
}
