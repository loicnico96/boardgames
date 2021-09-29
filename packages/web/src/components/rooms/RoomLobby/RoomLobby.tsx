import { PageContent, Text } from "@boardgames/components"

import { AsyncButton } from "components/ui/AsyncButton"
import { useAuth } from "hooks/store/useAuth"
import { useRoomData } from "hooks/useRoomData"
import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { identity } from "lib/utils/types"

import { useCloseRoom } from "./useCloseRoom"
import { useEnterRoom } from "./useEnterRoom"
import { useLeaveRoom } from "./useLeaveRoom"
import { useStartGame } from "./useStartGame"

export function RoomLobby() {
  const t = useTranslations()

  const roomId = useRoomId()

  const room = useRoomData(roomId, identity)

  const { user } = useAuth()

  const isPlayer = !!user && room.playerOrder.includes(user.userId)
  const isOwner = !!user && room.ownerId === user.userId

  const [closeRoom, closeRoomDisabled, closeRoomReason] = useCloseRoom(roomId)
  const [enterRoom, enterRoomDisabled, enterRoomReason] = useEnterRoom(roomId)
  const [leaveRoom, leaveRoomDisabled, leaveRoomReason] = useLeaveRoom(roomId)
  const [startGame, startGameDisabled, startGameReason] = useStartGame(roomId)

  return (
    <PageContent>
      {room.playerOrder.map(playerId => (
        <Text key={playerId}>
          {playerId} - {room.players[playerId].name}
        </Text>
      ))}
      <Text>Options: {JSON.stringify(room.options)}</Text>
      {isOwner ? (
        <>
          <AsyncButton
            disabled={startGameDisabled}
            onClick={startGame}
            reason={startGameReason}
            translations={t.room.startGame}
          />
          <AsyncButton
            disabled={closeRoomDisabled}
            onClick={closeRoom}
            reason={closeRoomReason}
            translations={t.room.closeRoom}
          />
        </>
      ) : isPlayer ? (
        <AsyncButton
          disabled={leaveRoomDisabled}
          onClick={leaveRoom}
          reason={leaveRoomReason}
          translations={t.room.leaveRoom}
        />
      ) : (
        <AsyncButton
          disabled={enterRoomDisabled}
          onClick={enterRoom}
          reason={enterRoomReason}
          translations={t.room.enterRoom}
        />
      )}
    </PageContent>
  )
}
