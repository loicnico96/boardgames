import { MetropolysAction, MetropolysState } from "../model"

export function validatePlayerAction(
  state: MetropolysState,
  playerId: string,
  action: unknown
): MetropolysAction {
  return { count: 0 }
}
