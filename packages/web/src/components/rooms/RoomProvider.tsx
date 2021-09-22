import { PageError, PageLoader } from "@boardgames/components"
import { ReactNode, useCallback } from "react"

import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useActions } from "hooks/store/useActions"
import { useTranslations } from "hooks/useTranslations"
import { getRoomRef } from "lib/db/collections"
import { RoomData } from "lib/model/RoomData"
import { useStore } from "lib/store/context"

export type RoomProviderProps = {
  children: ReactNode
  roomId: string
}

export function RoomProvider({ children, roomId }: RoomProviderProps) {
  const resource = useStore(store => store.rooms[roomId])
  const t = useTranslations()

  const { setRoomResources } = useActions()

  useDocumentListener<RoomData>(
    getRoomRef(roomId),
    useCallback(
      result => {
        setRoomResources({
          [roomId]: result,
        })
      },
      [roomId, setRoomResources]
    )
  )

  if (!resource || resource.loading) {
    return <PageLoader message={t.roomList.pageLoading} />
  }

  if (resource.error) {
    return <PageError error={resource.error} />
  }

  return (
    <>
      {JSON.stringify(resource.data)}
      {children}
    </>
  )
}
