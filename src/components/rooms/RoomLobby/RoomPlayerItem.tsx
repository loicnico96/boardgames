import styled from "@emotion/styled"

import Box from "components/ui/Box"
import { useRoomData } from "hooks/store/useRoomData"
import { useRoomId } from "hooks/store/useRoomId"
import { useTranslations } from "hooks/useTranslations"

export type RoomListItemProps = {
  playerId: string
}

const RoomPlayerItemContainer = styled(Box)`
  margin-bottom: 24px;
  white-space: pre-line;
`

export default function RoomPlayerItem({ playerId }: RoomListItemProps) {
  const roomId = useRoomId()
  const isOwner = useRoomData(roomId, room => playerId === room.ownerId)
  const playerName = useRoomData(roomId, room => room.players[playerId].name)
  const t = useTranslations()

  return (
    <RoomPlayerItemContainer>
      {isOwner ? t.roomPage.roomOwner({ playerName }) : playerName}
    </RoomPlayerItemContainer>
  )
}
