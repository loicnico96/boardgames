import { MetropolysContext } from "../context"
import { MetropolysAction } from "../model"

export async function resolvePlayerAction(
  context: MetropolysContext,
  playerId: string,
  action: MetropolysAction
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
