import { PageError, PageLoader } from "@boardgames/components"

import { useTranslations } from "hooks/useTranslations"
import { GameType } from "lib/games/types"

import { RoomListItem } from "./RoomListItem"
import { useRoomList } from "./useRoomList"

export type RoomListProps = {
  game: GameType | null
}

export function RoomList({ game }: RoomListProps) {
  const { resource } = useRoomList(game)
  const t = useTranslations()

  if (resource.loading) {
    return <PageLoader message={t.roomList.pageLoading} />
  }

  if (resource.error) {
    return <PageError error={resource.error} />
  }

  if (resource.data.length === 0) {
    return <div>{t.roomList.noRooms}</div>
  }

  return (
    <>
      {resource.data.map(room => (
        <RoomListItem key={room.id} room={room} />
      ))}
    </>
  )
}
