import styled from "@emotion/styled"

import PageContent from "components/layout/PageContent"
import Button from "components/ui/Button"
import { useRoomData } from "hooks/store/useRoomData"
import { useRoomId } from "hooks/store/useRoomId"
import { useTranslations } from "hooks/useTranslations"

import RoomPlayerItem from "./RoomPlayerItem"
import { useCloseRoom } from "./useCloseRoom"
import { useEnterRoom } from "./useEnterRoom"
import { useLeaveRoom } from "./useLeaveRoom"
import { useStartGame } from "./useStartGame"

const RoomPageContent = styled(PageContent)`
  column-gap: 48px;
  display: flex;
  flex-direction: row;
`

const RoomPageColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
`

const RoomPageButton = styled(Button)`
  margin-bottom: 8px;
`

export default function RoomLobby() {
  const t = useTranslations()

  const roomId = useRoomId()
  const playerOrder = useRoomData(roomId, room => room.playerOrder)

  const [closeRoom, closeRoomEnabled] = useCloseRoom(roomId)
  const [enterRoom, enterRoomEnabled] = useEnterRoom(roomId)
  const [leaveRoom, leaveRoomEnabled] = useLeaveRoom(roomId)
  const [startGame, startGameEnabled] = useStartGame(roomId)

  return (
    <RoomPageContent>
      <RoomPageColumn>
        {playerOrder.map(playerId => (
          <RoomPlayerItem key={playerId} playerId={playerId} />
        ))}
        {enterRoomEnabled && (
          <RoomPageButton
            onClick={enterRoom}
            translations={t.roomPage.enterRoom}
          />
        )}
        {leaveRoomEnabled && (
          <RoomPageButton
            onClick={leaveRoom}
            translations={t.roomPage.leaveRoom}
          />
        )}
        {startGameEnabled && (
          <RoomPageButton
            onClick={startGame}
            translations={t.roomPage.startGame}
          />
        )}
        {closeRoomEnabled && (
          <RoomPageButton
            onClick={closeRoom}
            translations={t.roomPage.closeRoom}
          />
        )}
      </RoomPageColumn>
      <RoomPageColumn>Options</RoomPageColumn>
    </RoomPageContent>
  )
}
