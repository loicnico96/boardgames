import { PageError, PageLoader } from "@boardgames/components"
import { useRouter } from "next/router"
import { ReactNode, useCallback } from "react"

import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useTranslations } from "hooks/useTranslations"
import { NotFoundError } from "lib/api/error"
import { GameType } from "lib/games/types"
import { getRoomRef } from "lib/model/collections"
import { RoomData } from "lib/model/RoomData"
import { useGlobalActions, useGlobalStore } from "lib/store/global"
import { Console } from "lib/utils/logger"
import { ROUTES } from "lib/utils/navigation"
import { LOADING } from "lib/utils/resource"

export type RoomProviderProps = {
  children: ReactNode
  game?: GameType
  roomId: string
}

export function RoomProvider({ children, game, roomId }: RoomProviderProps) {
  const { setRoomResources } = useGlobalActions()

  const roomResource = useGlobalStore(store => store.rooms[roomId] ?? LOADING)
  const router = useRouter()
  const t = useTranslations()

  useDocumentListener<RoomData>(
    getRoomRef(roomId),
    useCallback(
      resource => {
        setRoomResources({ [roomId]: resource })
        if (resource.data && resource.data.game !== game) {
          const roomUrl = ROUTES.room(resource.data.game, roomId)
          router.replace(roomUrl).catch(Console.error)
        }
      },
      [game, roomId, router, setRoomResources]
    )
  )

  if (roomResource.loading) {
    return <PageLoader message={t.room.pageLoading} />
  }

  if (roomResource.error instanceof NotFoundError) {
    return <PageError error={t.room.notFound} />
  }

  if (roomResource.error) {
    return <PageError error={t.room.pageError} />
  }

  return <>{children}</>
}
