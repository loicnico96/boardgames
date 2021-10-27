import { GameProvider } from "components/providers/GameProvider"
import { ImageLoader } from "components/ui/ImageLoader"
import { PapayooContext } from "lib/games/papayoo/context"
import { GameType } from "lib/games/types"

import { Game } from "./Game"
import { CardImageSources } from "./GameView/Card"
import { PapayooStoreProvider } from "./store"

export default function Papayoo() {
  return (
    <ImageLoader images={CardImageSources}>
      <PapayooStoreProvider>
        <GameProvider context={PapayooContext} game={GameType.PAPAYOO}>
          <Game />
        </GameProvider>
      </PapayooStoreProvider>
    </ImageLoader>
  )
}
