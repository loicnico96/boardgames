import { MetropolysContext } from "../roborally/model/RoborallyContext"

import { MetropolysState } from "./model/MetropolysState"

export async function resolveState(
  gameState: MetropolysState
): Promise<MetropolysState> {
  const ctx = new MetropolysContext(gameState)

  // TODO

  return ctx.getState()
}
