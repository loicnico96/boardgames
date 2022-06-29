import { Metropolys } from "@boardgames/metropolys"

import { GameProvider } from "components/providers/GameProvider"
import { GameType } from "lib/games/types"

export default function MetropolysComponent() {
  return (
    <GameProvider {...Metropolys} game={GameType.METROPOLYS}>
      {null}
    </GameProvider>
  )
}
