import { RoborallyContext } from "../context"
import { RoborallyAction } from "../model"

export async function resolvePlayerAction(
  context: RoborallyContext,
  playerId: string,
  action: RoborallyAction
) {
  if (action.count > context.state.state) {
    context.update({
      state: {
        $set: action.count,
      },
      players: {
        [playerId]: {
          count: {
            $set: action.count,
          },
        },
      },
    })
  }
}
