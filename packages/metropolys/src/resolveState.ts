import { GameContext } from "@boardgames/common"

import { MetropolysModel } from "./model"

type MetropolysContext = GameContext<MetropolysModel>

export async function resolveState(context: MetropolysContext) {
  await context.post({ code: "hello" })
}
