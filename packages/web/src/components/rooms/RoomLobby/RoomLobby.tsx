import { PageContent, Text } from "@boardgames/components"

import { useRoomData } from "hooks/rooms/useRoomData"
import { useRoomId } from "hooks/rooms/useRoomId"
import {
  getPlayerIds,
  getPlayers,
  getRoomOptions,
} from "lib/store/selectors/rooms"

export function RoomLobby() {
  const roomId = useRoomId()

  const playerIds = useRoomData(roomId, getPlayerIds)
  const players = useRoomData(roomId, getPlayers)
  const roomOptions = useRoomData(roomId, getRoomOptions)

  return (
    <PageContent>
      {playerIds.map(playerId => (
        <Text key={playerId}>
          {playerId} - {players[playerId].name}
        </Text>
      ))}
      <Text>Options: {JSON.stringify(roomOptions, undefined, 2)}</Text>
    </PageContent>
  )
}
