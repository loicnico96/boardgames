import { Roborally } from "@boardgames/roborally"

import { GameProvider } from "components/providers/GameProvider"
import { GameType } from "lib/games/types"

export default function RoborallyComponent() {
  return (
    <GameProvider {...Roborally} game={GameType.ROBORALLY}>
      {null}
    </GameProvider>
  )
}
