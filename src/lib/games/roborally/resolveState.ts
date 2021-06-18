import { RoborallyContext } from "../metropolys/model/MetropolysContext"

import { RoborallyState } from "./model/RoborallyState"

export async function resolveState(
  gameState: RoborallyState
): Promise<RoborallyState> {
  const ctx = new RoborallyContext(gameState)

  // TODO

  return ctx.getState()
}
