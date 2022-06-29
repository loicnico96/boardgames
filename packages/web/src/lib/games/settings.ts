import { GameSettings } from "@boardgames/common"
import { MetropolysSettings } from "@boardgames/metropolys"
import { RoborallySettings } from "@boardgames/roborally"

import { GameType } from "./types"

const SETTINGS: {
  [T in GameType]: GameSettings
} = {
  metropolys: MetropolysSettings,
  roborally: RoborallySettings,
}

export function getGameSettings(game: GameType): GameSettings {
  return SETTINGS[game]
}
