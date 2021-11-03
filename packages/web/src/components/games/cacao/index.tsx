import { GameProvider } from "components/providers/GameProvider"
import { ImageLoader } from "components/ui/ImageLoader"
import { CacaoContext } from "lib/games/cacao/context"
import { GameType } from "lib/games/types"

import { Game } from "./Game"
import { CacaoStoreProvider } from "./store"
import { ForestImageSources } from "./Tile/ForestTile"

const ImageSources = Object.values(ForestImageSources)

export default function Cacao() {
  return (
    <ImageLoader images={ImageSources}>
      <CacaoStoreProvider>
        <GameProvider context={CacaoContext} game={GameType.CACAO}>
          <Game />
        </GameProvider>
      </CacaoStoreProvider>
    </ImageLoader>
  )
}
