import { ReactNode, useCallback } from "react"

import PageError from "components/layout/PageError"
import PageLoader from "components/layout/PageLoader"
import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useActions } from "hooks/store/useActions"
import { useRoomResource } from "hooks/store/useRoomResource"
import { useTranslations } from "hooks/useTranslations"
import { getRoomRef } from "lib/db/collections"
import { getResourceError, isLoading } from "lib/utils/resources"

export type RoomProviderProps = {
  children: ReactNode
  roomId: string | null
}

export default function RoomProvider({ children, roomId }: RoomProviderProps) {
  const t = useTranslations()

  const { setRoomResources } = useActions()

  const error = useRoomResource(roomId, getResourceError)
  const loading = useRoomResource(roomId, isLoading)

  useDocumentListener(
    roomId ? getRoomRef(roomId) : null,
    useCallback(
      resource => {
        if (roomId) {
          setRoomResources({ [roomId]: resource })
        }
      },
      [roomId, setRoomResources]
    )
  )

  if (loading) {
    return <PageLoader message={t.roomPage.pageLoading} />
  }

  if (error) {
    return <PageError error={error} />
  }

  return <>{children}</>
}
