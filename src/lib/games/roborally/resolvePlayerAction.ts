import { RoborallyContext } from "../metropolys/model/MetropolysContext"

import { RoborallyAction } from "./model/RoborallyAction"
import { RoborallyState } from "./model/RoborallyState"

export async function resolvePlayerAction(
  gameState: RoborallyState,
  playerId: string,
  action: RoborallyAction
): Promise<RoborallyState> {
  const ctx = new RoborallyContext(gameState)

  // TODO

  return ctx.getState()
}
