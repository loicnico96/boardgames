import { MetropolysContext } from "../context"

export async function resolveState(context: MetropolysContext) {
  while (context.state.state < context.state.count) {
    context.update({ state: state => state + 1 })
    await context.post("event", {})
  }
}
