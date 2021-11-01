import { GameProvider } from "components/providers/GameProvider"
import { CacaoContext } from "lib/games/cacao/context"
import { GameType } from "lib/games/types"

import { Game } from "./Game"
import { CacaoStoreProvider } from "./store"

export default function Cacao() {
  return (
    <CacaoStoreProvider>
      <GameProvider context={CacaoContext} game={GameType.CACAO}>
        <Game />
      </GameProvider>
    </CacaoStoreProvider>
  )
}
