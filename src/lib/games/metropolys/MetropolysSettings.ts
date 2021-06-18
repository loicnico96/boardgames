import { GameSettings } from "../GameSettings"
import { GameType } from "../GameType"

import { getInitialGameState } from "./getInitialGameState"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { validateAction } from "./validateAction"
import { validateOptions } from "./validateOptions"

export const MetropolysSettings: GameSettings<GameType.METROPOLYS> = {
  defaultOptions: {},
  minPlayers: 2,
  maxPlayers: 4,

  getInitialGameState,
  resolvePlayerAction,
  resolveState,
  validateAction,
  validateOptions,
}
