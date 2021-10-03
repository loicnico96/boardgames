import { GameSettings } from "@boardgames/common"

import { MetropolysModel } from "./model"

export const MetropolysSettings: GameSettings<MetropolysModel> = {
  defaultOptions: { code: "metropolys/default" },
  minPlayers: 2,
  maxPlayers: 4,
}
