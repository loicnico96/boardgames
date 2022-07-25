import { GameDefinition } from "@boardgames/common"

import { getInitialGameState } from "./getInitialGameState"
import { getInitialOptions } from "./getInitialOptions"
import { MetropolysModel } from "./model"
import { resolveState } from "./resolveState"
import { validateAction } from "./validateAction"
import { validateOptions } from "./validateOptions"

export * from "./model"
export * from "./model/actions"
export * from "./model/buildings"
export * from "./model/districts"
export * from "./model/events"
export * from "./model/missions"
export * from "./model/options"
export * from "./model/players"
export * from "./model/state"
export * from "./model/tokens"
export * from "./settings"

export const Metropolys: GameDefinition<MetropolysModel> = {
  getInitialGameState,
  getInitialOptions,
  resolveState,
  validateAction,
  validateOptions,
}
