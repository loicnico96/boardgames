import { GAME_COMPONENTS } from "components/games/GameComponent"
import { RoomLobby } from "components/rooms/RoomLobby"
import { useRoomData } from "hooks/store/useRoomData"
import { useRoomId } from "hooks/useRoomId"
import { GameType } from "lib/games/types"
import { RoomData, RoomStatus } from "lib/model/RoomData"

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
