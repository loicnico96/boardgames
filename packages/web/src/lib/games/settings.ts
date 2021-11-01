import { GameSettings } from "@boardgames/common"

import { CacaoSettings } from "./cacao/settings"
import { MetropolysSettings } from "./metropolys/settings"
import { PapayooSettings } from "./papayoo/settings"
import { RoborallySettings } from "./roborally/settings"
import { GameType } from "./types"

const SETTINGS: Record<GameType, GameSettings> = {
  cacao: CacaoSettings,
  metropolys: MetropolysSettings,
  papayoo: PapayooSettings,
  roborally: RoborallySettings,
}

export function getGameSettings<T extends GameType>(game: T): GameSettings {
  return SETTINGS[game]
}
