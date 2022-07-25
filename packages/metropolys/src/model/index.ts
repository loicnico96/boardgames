import { GameModel } from "@boardgames/common"

import { MetropolysAction } from "./actions"
import { MetropolysEvent } from "./events"
import { MetropolysOptions } from "./options"
import { MetropolysPlayer } from "./players"
import { MetropolysState } from "./state"

export type MetropolysModel = GameModel<
  MetropolysAction,
  MetropolysEvent,
  MetropolysOptions,
  MetropolysPlayer,
  MetropolysState
>
