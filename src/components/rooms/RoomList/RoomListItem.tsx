import styled from "@emotion/styled"

import Box from "components/ui/Box"
import Link from "components/ui/Link"
import { TranslationConfig, useTranslations } from "hooks/useTranslations"
import { WithId } from "lib/db/types"
import { GameType } from "lib/games/GameType"
import { RoomData } from "lib/model/RoomData"
import { ROUTES } from "lib/utils/navigation"

export type RoomListItemProps = {
  room: WithId<RoomData>
}

const RoomListItemContainer = styled(Box)`
  margin-bottom: 24px;
  white-space: pre-line;
`

function formatRoomOptions(room: RoomData, t: TranslationConfig): string[] {
  switch (room.game) {
    case GameType.ROBORALLY: {
      const { options = [] } = room as any
      const boardNames = options.boardIds
        .map((boardId: string) => t.games.roborally.boards[boardId].name)
        .join(t.general.listSeparator)

      return [t.games.roborally.roomBoards({ boardNames })]
    }

    default:
      return []
  }
}

function formatRoomInfo(room: RoomData, t: TranslationConfig): string {
  const gameType = t.games[room.game].name
  const roomStatus = t.roomStatus[room.status]

  const playerNames = room.playerOrder
    .map(playerId => room.players[playerId].name)
    .join(t.general.listSeparator)

  return [
    t.roomPage.roomTitle({ gameType, roomStatus }).toUpperCase(),
    ...formatRoomOptions(room, t),
    t.roomPage.roomPlayers({ playerNames }),
  ].join("\n")
}

export default function RoomListItem({ room }: RoomListItemProps) {
  const t = useTranslations()

  return (
    <Link href={ROUTES.room(room.id)}>
      <RoomListItemContainer>{formatRoomInfo(room, t)}</RoomListItemContainer>
    </Link>
  )
}
