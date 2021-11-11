import { getRoomRef } from "@boardgames/common"
import { PageError, PageLoader } from "@boardgames/components"
import { useRouter } from "next/router"
import { ReactNode, useCallback, useEffect, useRef } from "react"
import { toast } from "react-toastify"

import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useCurrentUserId } from "hooks/useCurrentUserId"
import { withSearchParams } from "hooks/useSearchParams"
import { useTranslations } from "hooks/useTranslations"
import { GameType } from "lib/games/types"
import { RoomData } from "lib/model/RoomData"
import { useGlobalActions, useGlobalStore } from "lib/store/global"
import { Console } from "lib/utils/logger"
import { Param, ROUTES } from "lib/utils/navigation"
import { Resource } from "lib/utils/resource"

export type RoomProviderProps = {
  children: ReactNode
  game?: GameType
  roomId: string
}

export function RoomProvider({ children, game, roomId }: RoomProviderProps) {
  const resource = useGlobalStore(store => store.rooms[roomId])
  const router = useRouter()
  const t = useTranslations()

  const { setRoomResources } = useGlobalActions()
  const userId = useCurrentUserId()

  const previousRef = useRef(resource)

  useEffect(() => {
    previousRef.current = resource
  }, [previousRef, resource])

  const handleRedirects = useCallback(
    async (current: Resource<RoomData>, previous?: Resource<RoomData>) => {
      if (current.error?.message.match(/not found/i)) {
        if (previous?.data && previous.data.ownerId !== userId) {
          toast.info(t.room.closedByOwner)
        }

        const redirect = withSearchParams(
          ROUTES.roomList(),
          game ? { [Param.GAME_TYPE]: game } : {}
        )

        await router.replace(redirect)
      }

      if (current.data && current.data.game !== game) {
        const redirect = ROUTES.room(current.data.game, roomId)
        await router.replace(redirect)
      }
    },
    [game, roomId, router, t, userId]
  )

  useDocumentListener<RoomData>(
    getRoomRef(roomId),
    useCallback(
      result => {
        handleRedirects(result, previousRef.current).then(
          () => setRoomResources({ [roomId]: result }),
          Console.error
        )
      },
      [handleRedirects, previousRef, roomId, setRoomResources]
    )
  )

  if (!resource || resource.loading) {
    return <PageLoader message={t.room.pageLoading} />
  }

  if (resource.error) {
    const message = resource.error.message.match(/not found/i)
      ? t.room.notFound
      : t.room.pageError

    return <PageError error={message} />
  }

  return <>{children}</>
}
