import { RoborallyContext } from "../context"
import { BoardFeature, GamePhase } from "../model"

import { checkDamage } from "./checkDamage"
import { checkHoles } from "./checkHoles"
import { nextPhase } from "./nextPhase"
import { resolveCheckpoints } from "./resolveCheckpoints"
import { resolveConveyors } from "./resolveConveyors"
import { resolveCrushers } from "./resolveCrushers"
import { resolveGears } from "./resolveGears"
import { resolveBoardLasers, resolvePlayerLasers } from "./resolveLasers"
import { resolveProgramCards } from "./resolveProgramCards"
import { resolvePushers } from "./resolvePushers"
import { resolveRepairs } from "./resolveRepairs"

export async function resolveSequence(
  context: RoborallyContext,
  sequence: number
): Promise<void> {
  context.update({ $merge: { sequence } })

  const { features } = context.state.board

  if (features.includes(BoardFeature.TRAP)) {
    await nextPhase(context, GamePhase.RESOLVE_TRAP)
    await checkHoles(context)
  }

  await nextPhase(context, GamePhase.RESOLVE_PROGRAM)
  await resolveProgramCards(context)

  if (features.includes(BoardFeature.CONVEYOR_FAST)) {
    await nextPhase(context, GamePhase.RESOLVE_CONVEYOR_FAST)
    await resolveConveyors(context, true)
  }

  if (features.includes(BoardFeature.CONVEYOR)) {
    await nextPhase(context, GamePhase.RESOLVE_CONVEYOR)
    await resolveConveyors(context)
  }

  if (features.includes(BoardFeature.PUSHER)) {
    await nextPhase(context, GamePhase.RESOLVE_PUSHER)
    await resolvePushers(context)
  }

  if (features.includes(BoardFeature.CRUSHER)) {
    await nextPhase(context, GamePhase.RESOLVE_CRUSHER)
    await resolveCrushers(context)
  }

  if (features.includes(BoardFeature.GEAR)) {
    await nextPhase(context, GamePhase.RESOLVE_GEAR)
    await resolveGears(context)
  }

  await nextPhase(context, GamePhase.RESOLVE_LASER)
  await resolvePlayerLasers(context)
  await resolveBoardLasers(context)
  await checkDamage(context)

  if (features.includes(BoardFeature.REPAIR)) {
    await nextPhase(context, GamePhase.RESOLVE_REPAIR)
    await resolveRepairs(context)
  }

  await nextPhase(context, GamePhase.RESOLVE_CHECKPOINT)
  await resolveCheckpoints(context)
}
