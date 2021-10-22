import { GameProvider } from "components/providers/GameProvider"
import { ImageLoader } from "components/ui/ImageLoader"
import { useRoomId } from "hooks/useRoomId"
import { PapayooContext } from "lib/games/papayoo/context"
import { GameType } from "lib/games/types"

import { CardImageSources } from "./Card"
import { Game } from "./Game"
import { usePapayooStore } from "./store"

export default function Papayoo() {
  const roomId = useRoomId()

  return (
    <ImageLoader images={CardImageSources}>
      <GameProvider
        context={PapayooContext}
        game={GameType.PAPAYOO}
        roomId={roomId}
        store={usePapayooStore}
      >
        <Game />
      </GameProvider>
    </ImageLoader>
  )
}
