import { BaseAction } from "@boardgames/common"

import { RoborallyContext } from "../context"
import { RoborallyAction } from "../model"

export function validateAction(
  context: RoborallyContext,
  playerId: string,
  action: BaseAction
): RoborallyAction {
  return { ...action, count: 0 }
}
