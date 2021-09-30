import { RoborallyContext } from "../context"

export async function resolveState(context: RoborallyContext) {
  while (context.state.state < context.state.count) {
    await context
      .update({
        state: state => state + 1,
      })
      .post({
        code: String(context.state.state),
      })
  }
}
