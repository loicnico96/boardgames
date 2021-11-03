import { PageContent, Text } from "@boardgames/components"
import { identity } from "@boardgames/utils"

import { AsyncButton } from "components/ui/AsyncButton"
import { useCurrentUserId } from "hooks/useCurrentUserId"
import { useRoomData } from "hooks/useRoomData"
import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"

import { useCloseRoom } from "./useCloseRoom"
import { useEnterRoom } from "./useEnterRoom"
import { useLeaveRoom } from "./useLeaveRoom"
import { useStartGame } from "./useStartGame"

export function RoomLobby() {
  const t = useTranslations()

  const roomId = useRoomId()

  const room = useRoomData(roomId, identity)

  const userId = useCurrentUserId()

  const isPlayer = !!userId && room.playerOrder.includes(userId)
  const isOwner = !!userId && room.ownerId === userId

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
