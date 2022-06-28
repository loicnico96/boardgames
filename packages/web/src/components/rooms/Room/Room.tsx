import { RoomStatus } from "@boardgames/common"

import { GameComponents } from "components/games/GameComponent"
import { GameProvider } from "components/providers/GameProvider"
import { RoomLobby } from "components/rooms/RoomLobby"
import { useRoomData } from "hooks/rooms/useRoomData"
import { useRoomId } from "hooks/rooms/useRoomId"
import { getGameType, getRoomStatus } from "lib/store/selectors/rooms"

export function Room() {
  const roomId = useRoomId()
  const roomStatus = useRoomData(roomId, getRoomStatus)
  const game = useRoomData(roomId, getGameType)

  if (roomStatus === RoomStatus.OPENED) {
    return <RoomLobby />
  }

  const GameComponent = GameComponents[game]

  return (
    <GameProvider game={game}>
      <GameComponent />
    </GameProvider>
  )
}
