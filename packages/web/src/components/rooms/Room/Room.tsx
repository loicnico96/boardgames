import dynamic, { DynamicOptions } from "next/dynamic"
import { ComponentType } from "react"

import { GameComponentLoader } from "components/games/GameComponentLoader"
import { RoomLobby } from "components/rooms/RoomLobby"
import { useRoomData } from "hooks/useRoomData"
import { useRoomId } from "hooks/useRoomId"
import { GameType } from "lib/games/types"
import { RoomData, RoomStatus } from "lib/model/RoomData"

const DYNAMIC_OPTIONS: DynamicOptions = {
  loading: GameComponentLoader,
  ssr: false,
}

const GAME_COMPONENTS: Record<GameType, ComponentType> = {
  metropolys: dynamic(
    () =>
      import(
        /* webpackChunkName: "metropolys" */
        "components/games/metropolys"
      ),
    DYNAMIC_OPTIONS
  ),
  papayoo: dynamic(
    () =>
      import(
        /* webpackChunkName: "papayoo" */
        "components/games/papayoo"
      ),
    DYNAMIC_OPTIONS
  ),
  roborally: dynamic(
    () =>
      import(
        /* webpackChunkName: "roborally" */
        "components/games/roborally"
      ),
    DYNAMIC_OPTIONS
  ),
}

export function getGameType(room: RoomData): GameType {
  return room.game
}

export function getRoomStatus(room: RoomData): RoomStatus {
  return room.status
}

export function Room() {
  const roomId = useRoomId()
  const roomStatus = useRoomData(roomId, getRoomStatus)
  const game = useRoomData(roomId, getGameType)

  if (roomStatus === RoomStatus.OPENED) {
    return <RoomLobby />
  }

  const GameComponent = GAME_COMPONENTS[game]

  return <GameComponent />
}
