import { PageError, PageLoader } from "@boardgames/components"

import { useTranslations } from "hooks/useTranslations"

import { RoomListItem } from "./RoomListItem"
import { useRoomList } from "./useRoomList"

export function RoomList() {
  const { resource } = useRoomList()
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
