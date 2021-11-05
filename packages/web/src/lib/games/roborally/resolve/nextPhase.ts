import { RoborallyContext } from "../context"
import { GamePhase } from "../model"

export async function nextPhase(context: RoborallyContext, phase: GamePhase) {
  context.update({ $merge: { phase } })

  await context.post("nextPhase", { phase })
}
