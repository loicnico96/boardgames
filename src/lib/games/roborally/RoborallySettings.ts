import { GameSettings } from "../GameSettings"
import { GameType } from "../GameType"

import { getInitialGameState } from "./getInitialGameState"
import { resolvePlayerAction } from "./resolvePlayerAction"
import { resolveState } from "./resolveState"
import { validateAction } from "./validateAction"
import { validateOptions } from "./validateOptions"

export const RoborallySettings: GameSettings<GameType.ROBORALLY> = {
  defaultOptions: {
    checkpoints: 3,
    boardIds: ["Island"],
  },
  minPlayers: 1,
  maxPlayers: 4,

  getInitialGameState,
  resolvePlayerAction,
  resolveState,
  validateAction,
  validateOptions,
}
