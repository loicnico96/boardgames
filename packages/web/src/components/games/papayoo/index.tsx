import { GameProvider } from "components/providers/GameProvider"
import { useRoomId } from "hooks/useRoomId"
import { PapayooApi } from "lib/games/papayoo/api"
import { GameType } from "lib/games/types"

import { Game } from "./Game"

export default function Papayoo() {
  const roomId = useRoomId()

  return (
    <GameProvider api={PapayooApi} game={GameType.PAPAYOO} roomId={roomId}>
      <Game />
    </GameProvider>
  )
}
