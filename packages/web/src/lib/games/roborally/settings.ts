import { GameSettings } from "@boardgames/common"

import { RoborallyModel } from "./model"

export const RoborallySettings: GameSettings<RoborallyModel> = {
  defaultOptions: { code: "roborally/default" },
  minPlayers: 1,
  maxPlayers: 4,
}
