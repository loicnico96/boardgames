import { GameProvider } from "components/providers/GameProvider"
import { MetropolysContext } from "lib/games/metropolys/context"
import { GameType } from "lib/games/types"

export default function Metropolys() {
  return (
    <GameProvider context={MetropolysContext} game={GameType.METROPOLYS}>
      {null}
    </GameProvider>
  )
}
