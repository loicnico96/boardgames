import { BaseAction } from "@boardgames/common"

import { RoborallyAction, RoborallyState } from "../model"

export function validatePlayerAction(
  state: RoborallyState,
  playerId: string,
  action: BaseAction
): RoborallyAction {
  return { ...action, count: 0 }
}
