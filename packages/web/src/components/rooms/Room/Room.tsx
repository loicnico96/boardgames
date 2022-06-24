import { GameProvider } from "components/providers/GameProvider"
import { RoomLobby } from "components/rooms/RoomLobby"
import { useGameData } from "hooks/rooms/useGameData"
import { useRoomData } from "hooks/rooms/useRoomData"
import { useRoomId } from "hooks/rooms/useRoomId"
import { RoomStatus } from "lib/model/RoomData"
import { getGameType, getRoomStatus } from "lib/store/selectors/rooms"

export function Room() {
  const roomId = useRoomId()
  const roomStatus = useRoomData(roomId, getRoomStatus)
  const game = useRoomData(roomId, getGameType)

  if (roomStatus === RoomStatus.OPENED) {
    return <RoomLobby />
  }

  return (
    <GameProvider game={game}>
      <Game />
    </GameProvider>
  )
}

// TODO
export function Game() {
  const roomId = useRoomId()
  const game = useRoomData(roomId, getGameType)
  const state = useGameData(game, roomId, s => s)
  return <>{JSON.stringify(state, undefined, 2)}</>
}
