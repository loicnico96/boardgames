import { GameProvider } from "components/providers/GameProvider"
import { ImageLoader } from "components/ui/ImageLoader"
import { useRoomId } from "hooks/useRoomId"
import { PapayooContext } from "lib/games/papayoo/context"
import { GameType } from "lib/games/types"

import { CardImageSources } from "./Card"
import { Game } from "./Game"

export default function Papayoo() {
  const roomId = useRoomId()

  return (
    <ImageLoader images={CardImageSources}>
      <GameProvider
        context={PapayooContext}
        game={GameType.PAPAYOO}
        roomId={roomId}
      >
        <Game />
      </GameProvider>
    </ImageLoader>
  )
}
