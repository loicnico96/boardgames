import { PageError, PageLoader } from "@boardgames/components"
import { useRouter } from "next/router"
import { ReactNode, useCallback } from "react"
import { toast } from "react-toastify"

import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useRoomResource } from "hooks/rooms/useRoomResource"
import { usePreviousRef } from "hooks/usePreviousRef"
import { useTranslations } from "hooks/useTranslations"
import { NotFoundError } from "lib/api/error"
import { useAuthContext } from "lib/auth/context"
import { GameType } from "lib/games/types"
import { getRoomRef } from "lib/model/collections"
import { RoomData } from "lib/model/RoomData"
import { useGlobalActions } from "lib/store/global"
import { Console } from "lib/utils/logger"
import { ROUTES } from "lib/utils/navigation"

export type RoomProviderProps = {
  children: ReactNode
  game?: GameType
  roomId: string
}

export function RoomProvider({ children, game, roomId }: RoomProviderProps) {
  const { setRoomResources } = useGlobalActions()

  const roomResource = useRoomResource(roomId)
  const router = useRouter()
  const t = useTranslations()

  const { user } = useAuthContext()

  const previousRef = usePreviousRef(roomResource)

  useDocumentListener<RoomData>(
    getRoomRef(roomId),
    useCallback(
      resource => {
        setRoomResources({ [roomId]: resource })
        if (resource.data && resource.data.game !== game) {
          const roomUrl = ROUTES.room(resource.data.game, roomId)
          router.replace(roomUrl).catch(Console.error)
        }

        if (resource.error instanceof NotFoundError) {
          if (previousRef.current?.data) {
            if (user?.userId !== previousRef.current.data.createdBy) {
              toast.info(t.room.closedByOwner)
            }

            const roomListUrl = ROUTES.roomList(previousRef.current.data.game)
            router.replace(roomListUrl).catch(Console.error)
          }
        }
      },
      [game, previousRef, roomId, router, setRoomResources, t, user]
    )
  )

  if (roomResource.loading) {
    return <PageLoader message={t.room.pageLoading} />
  }

  if (roomResource.error instanceof NotFoundError) {
    return <PageError error={t.reason.notFoundRoom} />
  }

  if (roomResource.error) {
    return <PageError error={t.room.pageError} />
  }

  return <>{children}</>
}
