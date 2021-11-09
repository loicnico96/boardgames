import { RoborallyContext } from "../context"
import { GamePhase } from "../model"

import { checkHoles } from "./checkHoles"
import { nextPhase } from "./nextPhase"
import { resolveCheckpoints } from "./resolveCheckpoints"
import { resolveConveyors } from "./resolveConveyors"
import { resolveCrushers } from "./resolveCrushers"
import { resolveGears } from "./resolveGears"
import { resolveProgramCards } from "./resolveProgramCards"
import { resolvePushers } from "./resolvePushers"
import { resolveRepairs } from "./resolveRepairs"

export async function resolveSequence(
  context: RoborallyContext,
  sequence: number
): Promise<void> {
  context.update({ $merge: { sequence } })

  await nextPhase(context, GamePhase.RESOLVE_TRAP)
  await checkHoles(context)

  await nextPhase(context, GamePhase.RESOLVE_PROGRAM)
  await resolveProgramCards(context)

  await nextPhase(context, GamePhase.RESOLVE_CONVEYOR_FAST)
  await resolveConveyors(context, true)

  await nextPhase(context, GamePhase.RESOLVE_CONVEYOR)
  await resolveConveyors(context)

  await nextPhase(context, GamePhase.RESOLVE_PUSHER)
  await resolvePushers(context)

  await nextPhase(context, GamePhase.RESOLVE_CRUSHER)
  await resolveCrushers(context)

  await nextPhase(context, GamePhase.RESOLVE_GEAR)
  await resolveGears(context)

  // await nextPhase(context, GamePhase.RESOLVE_LASER)
  // TODO: await resolveLasers(context, sequence)

  await nextPhase(context, GamePhase.RESOLVE_REPAIR)
  await resolveRepairs(context)

  await nextPhase(context, GamePhase.RESOLVE_CHECKPOINT)
  await resolveCheckpoints(context)
}
