import { MetropolysContext } from "../context"

export async function resolveState(context: MetropolysContext) {
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
