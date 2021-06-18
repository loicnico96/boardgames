import { MetropolysContext } from "../roborally/model/RoborallyContext"

import { MetropolysAction } from "./model/MetropolysAction"
import { MetropolysState } from "./model/MetropolysState"

export async function resolvePlayerAction(
  gameState: MetropolysState,
  playerId: string,
  action: MetropolysAction
): Promise<MetropolysState> {
  const ctx = new MetropolysContext(gameState)

  // TODO

  return ctx.getState()
}
