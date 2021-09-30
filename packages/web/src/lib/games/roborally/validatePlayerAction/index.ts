import { RoborallyAction, RoborallyState } from "../model"

export function validatePlayerAction(
  state: RoborallyState,
  playerId: string,
  action: unknown
): RoborallyAction {
  return { count: 0 }
}
