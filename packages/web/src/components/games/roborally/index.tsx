import { GameProvider } from "components/providers/GameProvider"
import { CacaoContext } from "lib/games/cacao/context"
import { GameType } from "lib/games/types"

import { Game } from "./Game"

export default function Cacao() {
  return (
    <GameProvider context={CacaoContext} game={GameType.CACAO}>
      <Game />
    </GameProvider>
  )
}
