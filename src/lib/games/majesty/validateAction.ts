import { int, object } from "lib/utils/validation"

import { MajestyAction } from "./model/MajestyAction"
import { MajestyState } from "./model/MajestyState"

export function validateAction(
  gameState: MajestyState,
  playerId: string,
  action: unknown
): MajestyAction {
  const typedAction = object({
    card: int({ min: 0, max: 4 }),
    side: int({ min: 0, max: 1 }),
  })(action)

  return typedAction
}
