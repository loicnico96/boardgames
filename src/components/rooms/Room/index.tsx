import styled from "@emotion/styled"

import PageContent from "components/layout/PageContent"
import Button from "components/ui/Button"
import { useRoomData } from "hooks/store/useRoomData"
import { useRoomId } from "hooks/store/useRoomId"
import { useTranslations } from "hooks/useTranslations"

import { useEnterRoom } from "./useEnterRoom"
import { useLeaveRoom } from "./useLeaveRoom"

const RoomPageContent = styled(PageContent)`
  column-gap: 48px;
  display: flex;
  flex-direction: row;
`

const RoomPageColumn = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
`

export default function Room() {
  const t = useTranslations()

  const roomId = useRoomId()
  const playerOrder = useRoomData(roomId, room => room.playerOrder)

  const [enterRoom, enterRoomEnabled] = useEnterRoom(roomId)
  const [leaveRoom, leaveRoomEnabled] = useLeaveRoom(roomId)

  return (
    <RoomPageContent>
      <RoomPageColumn>
        {playerOrder.map(playerId => (
          <div key={playerId}>{playerId}</div>
        ))}
        {enterRoomEnabled && (
          <Button onClick={enterRoom} translations={t.roomPage.enterRoom} />
        )}

        {leaveRoomEnabled && (
          <Button onClick={leaveRoom} translations={t.roomPage.leaveRoom} />
        )}
      </RoomPageColumn>
      <RoomPageColumn>Options</RoomPageColumn>
    </RoomPageContent>
  )
}
