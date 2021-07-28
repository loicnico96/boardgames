import dynamic, { DynamicOptions } from "next/dynamic"
import { ComponentType } from "react"

import GameComponentLoader from "components/games/GameComponentLoader"
import GameProvider from "components/games/GameProvider"
import RoomLobby from "components/rooms/RoomLobby"
import { useRoomData } from "hooks/store/useRoomData"
import { useRoomGameType } from "hooks/store/useRoomGameType"
import { useRoomId } from "hooks/store/useRoomId"
import { GameType } from "lib/games/GameType"
import { RoomStatus } from "lib/model/RoomData"

const DYNAMIC_OPTIONS: DynamicOptions = {
  loading: GameComponentLoader,
  ssr: false,
}

const GAME_COMPONENTS: Record<GameType, ComponentType> = {
  [GameType.METROPOLYS]: dynamic(
    () => import("components/games/metropolys"),
    DYNAMIC_OPTIONS
  ),
  [GameType.ROBORALLY]: dynamic(
    () => import("components/games/roborally"),
    DYNAMIC_OPTIONS
  ),
}

export default function Room() {
  const roomId = useRoomId()
  const game = useRoomGameType()
  const roomStatus = useRoomData(roomId, room => room.status)

  if (roomStatus === RoomStatus.OPENED) {
    return <RoomLobby />
  }

  const GameComponent = GAME_COMPONENTS[game]

  return (
    <GameProvider game={game} roomId={roomId}>
      <GameComponent />
    </GameProvider>
  )
}
