import { BaseAction } from "@boardgames/common"

import { MetropolysAction, MetropolysState } from "../model"

export function validatePlayerAction(
  state: MetropolysState,
  playerId: string,
  action: BaseAction
): MetropolysAction {
  return { ...action, count: 0 }
}
