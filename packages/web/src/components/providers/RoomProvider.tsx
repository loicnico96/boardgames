import { PageError, PageLoader } from "@boardgames/components"
import { useRouter } from "next/router"
import { ReactNode, useCallback, useState } from "react"

import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useTranslations } from "hooks/useTranslations"
import { NotFoundError } from "lib/api/error"
import { GameType } from "lib/games/types"
import { getRoomRef } from "lib/model/collections"
import { RoomData } from "lib/model/RoomData"
import { Console } from "lib/utils/logger"
import { ROUTES } from "lib/utils/navigation"
import { LOADING, Resource } from "lib/utils/resource"

export type RoomProviderProps = {
  children: ReactNode
  game?: GameType
  roomId: string
}

export function RoomProvider({ children, game, roomId }: RoomProviderProps) {
  const router = useRouter()
  const t = useTranslations()

  const [roomResource, setRoomResource] = useState<Resource<RoomData>>(LOADING)

  useDocumentListener<RoomData>(
    getRoomRef(roomId),
    useCallback(
      resource => {
        setRoomResource(resource)
        if (resource.data && resource.data.game !== game) {
          const roomUrl = ROUTES.room(resource.data.game, resource.data.id)
          router.replace(roomUrl).catch(Console.error)
        }
      },
      [game, router, setRoomResource]
    )
  )

  if (roomResource.loading) {
    return <PageLoader message={t.room.pageLoading} />
  }

  if (roomResource.error) {
    if (roomResource.error instanceof NotFoundError) {
      return <PageError error={t.room.notFound} />
    } else {
      return <PageError error={t.room.pageError} />
    }
  }

  return <>{children}</>
}
