import { int, object, oneOf } from "lib/utils/validation"

import { MetropolysAction } from "./model/MetropolysAction"
import { MetropolysState } from "./model/MetropolysState"

export function validateAction(
  gameState: MetropolysState,
  playerId: string,
  action: unknown
): MetropolysAction {
  const typedAction = oneOf(
    object({
      district: int(),
      height: int(),
      pass: false,
    }),
    object({
      pass: true,
    })
  )(action)

  return typedAction
}
