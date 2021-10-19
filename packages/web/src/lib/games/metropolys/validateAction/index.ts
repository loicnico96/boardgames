import { BaseAction } from "@boardgames/common"

import { MetropolysContext } from "../context"
import { MetropolysAction } from "../model"

export function validateAction(
  context: MetropolysContext,
  playerId: string,
  action: BaseAction
): MetropolysAction {
  return { ...action, count: 0 }
}
