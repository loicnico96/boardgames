import { PageContent, Text } from "@boardgames/components"

import { AsyncButton } from "components/ui/AsyncButton"
import { useRoomData } from "hooks/rooms/useRoomData"
import { useRoomId } from "hooks/rooms/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { useAuthContext } from "lib/auth/context"
import {
  getOwnerId,
  getPlayerIds,
  getPlayers,
  getRoomOptions,
} from "lib/store/selectors/rooms"

import { useCloseRoom } from "./useCloseRoom"
import { useEnterRoom } from "./useEnterRoom"
import { useLeaveRoom } from "./useLeaveRoom"
import { useStartGame } from "./useStartGame"

export function RoomLobby() {
  const roomId = useRoomId()

  const ownerId = useRoomData(roomId, getOwnerId)
  const playerIds = useRoomData(roomId, getPlayerIds)
  const players = useRoomData(roomId, getPlayers)
  const roomOptions = useRoomData(roomId, getRoomOptions)

  const t = useTranslations()

  const { user } = useAuthContext()

  const isOwner = !!user && ownerId === user.userId
  const isPlayer = !!user && playerIds.includes(user.userId)

  const [closeRoom, closeRoomEnabled, closeRoomReason] = useCloseRoom(roomId)
  const [enterRoom, enterRoomEnabled, enterRoomReason] = useEnterRoom(roomId)
  const [leaveRoom, leaveRoomEnabled, leaveRoomReason] = useLeaveRoom(roomId)
  const [startGame, startGameEnabled, startGameReason] = useStartGame(roomId)

  return (
    <PageContent>
      {playerIds.map(playerId => (
        <Text key={playerId}>
          {playerId} - {players[playerId].name}
        </Text>
      ))}
      <Text>Options: {JSON.stringify(roomOptions, undefined, 2)}</Text>
      {isOwner && (
        <AsyncButton
          disabled={!startGameEnabled}
          onClick={startGame}
          reason={startGameReason}
          translations={t.room.startGame}
        />
      )}
      {isOwner && (
        <AsyncButton
          disabled={!closeRoomEnabled}
          onClick={closeRoom}
          reason={closeRoomReason}
          translations={t.room.closeRoom}
        />
      )}
      {isPlayer && !isOwner && (
        <AsyncButton
          disabled={!leaveRoomEnabled}
          onClick={leaveRoom}
          reason={leaveRoomReason}
          translations={t.room.leaveRoom}
        />
      )}
      {!isPlayer && (
        <AsyncButton
          disabled={!enterRoomEnabled}
          onClick={enterRoom}
          reason={enterRoomReason}
          translations={t.room.enterRoom}
        />
      )}
    </PageContent>
  )
}
