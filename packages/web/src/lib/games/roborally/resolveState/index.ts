import { RoborallyContext } from "../context"

export async function resolveState(context: RoborallyContext) {
  while (context.state.state < context.state.count) {
    context.update({ state: state => state + 1 })
    await context.post("event", {})
  }
}
