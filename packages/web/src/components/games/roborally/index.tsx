import { GameProvider } from "components/providers/GameProvider"
import { RoborallyContext } from "lib/games/roborally/context"
import { GameType } from "lib/games/types"

export default function Roborally() {
  return (
    <GameProvider context={RoborallyContext} game={GameType.METROPOLYS}>
      {null}
    </GameProvider>
  )
}
