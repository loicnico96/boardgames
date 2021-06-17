import { array, boolean, int, object } from "lib/utils/validation"

import { RoborallyAction } from "./model/RoborallyAction"
import { RoborallyState } from "./model/RoborallyState"

export function validateAction(
  gameState: RoborallyState,
  playerId: string,
  action: unknown
): RoborallyAction {
  const typedAction = object({
    poweredDown: boolean(),
    program: array(int()),
  })(action)

  return typedAction
}
