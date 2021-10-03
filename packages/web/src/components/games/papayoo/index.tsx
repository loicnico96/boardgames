import { GameProvider } from "components/providers/GameProvider"
import { useRoomId } from "hooks/useRoomId"
import { PapayooApi } from "lib/games/papayoo/api"

import { Game } from "./Game"

export default function Papayoo() {
  const roomId = useRoomId()

  return (
    <GameProvider api={PapayooApi} game="papayoo" roomId={roomId}>
      <Game />
    </GameProvider>
  )
}
