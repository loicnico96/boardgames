import { GameModel } from "@boardgames/common"

import { MetropolysAction } from "./action"
import { MetropolysEvent } from "./event"
import { MetropolysOptions } from "./options"
import { MetropolysPlayer, MetropolysState } from "./state"

export type MetropolysModel = GameModel<
  MetropolysAction,
  MetropolysEvent,
  MetropolysOptions,
  MetropolysPlayer,
  MetropolysState
>
