import { GameSettings } from "@boardgames/common"

import { MetropolysSettings } from "./metropolys/settings"
import { PapayooSettings } from "./papayoo/settings"
import { RoborallySettings } from "./roborally/settings"
import { Games, GameType } from "./types"

export function getGameSettings<T extends GameType>(
  game: T
): GameSettings<Games[T]> {
  return {
    metropolys: MetropolysSettings,
    papayoo: PapayooSettings,
    roborally: RoborallySettings,
  }[game] as GameSettings<any>
}
