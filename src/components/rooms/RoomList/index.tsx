import PageError from "components/layout/PageError"
import PageLoader from "components/layout/PageLoader"
import { useTranslations } from "hooks/useTranslations"
import { GameType } from "lib/games/GameType"

import RoomListItem from "./RoomListItem"
import { useRoomList } from "./useRoomList"

export type RoomListProps = {
  game: GameType | null
}

export default function RoomList({ game }: RoomListProps) {
  const [resource] = useRoomList(game)

  const t = useTranslations()

  if (resource.error) {
    return <PageError error={resource.error} />
  }

  if (resource.loading) {
    return <PageLoader message={t.roomList.pageLoading} />
  }

  if (resource.data.length === 0) {
    return <div>{t.roomList.noRooms}</div>
  }

  return (
    <div>
      {resource.data.map(room => (
        <RoomListItem key={room.id} room={room} />
      ))}
    </div>
  )
}
