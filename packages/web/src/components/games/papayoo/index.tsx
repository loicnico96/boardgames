import { GameProvider } from "components/providers/GameProvider"
import { useRoomId } from "hooks/useRoomId"
import { PapayooSettings } from "lib/games/papayoo/settings"

import { Game } from "./Game"

export default function Papayoo() {
  const roomId = useRoomId()

  return (
    <GameProvider
      game="papayoo"
      resolveState={PapayooSettings.resolveState}
      roomId={roomId}
    >
      <Game />
    </GameProvider>
  )
}
