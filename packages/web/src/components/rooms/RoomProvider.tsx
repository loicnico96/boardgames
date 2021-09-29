import { PageError, PageLoader } from "@boardgames/components"
import { useRouter } from "next/router"
import { ReactNode, useCallback, useEffect, useRef } from "react"
import { toast } from "react-toastify"

import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useActions } from "hooks/store/useActions"
import { useAuth } from "hooks/store/useAuth"
import { withSearchParams } from "hooks/useSearchParams"
import { useTranslations } from "hooks/useTranslations"
import { getRoomRef } from "lib/db/collections"
import { WithId } from "lib/db/types"
import { GameType } from "lib/games"
import { RoomData } from "lib/model/RoomData"
import { useStore } from "lib/store/context"
import { Console } from "lib/utils/logger"
import { Param, ROUTES } from "lib/utils/navigation"
import { Resource } from "lib/utils/resource"

export type RoomProviderProps = {
  children: ReactNode
  game: GameType | null
  roomId: string
}

export function RoomProvider({ children, game, roomId }: RoomProviderProps) {
  const resource = useStore(store => store.rooms[roomId])
  const router = useRouter()
  const t = useTranslations()

  const { setRoomResources } = useActions()
  const { user } = useAuth()

  const previousRef = useRef(resource)

  useEffect(() => {
    previousRef.current = resource
  }, [previousRef, resource])

  const handleRedirects = useCallback(
    async (
      current: Resource<WithId<RoomData>>,
      previous?: Resource<WithId<RoomData>>
    ) => {
      if (current.error?.message.match(/not found/i)) {
        if (previous?.data && previous.data.ownerId !== user?.userId) {
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
    [game, roomId, router, t, user]
  )

  useDocumentListener<RoomData>(
    getRoomRef(roomId),
    useCallback(
      result => {
        handleRedirects(result, previousRef.current).then(
          () => setRoomResources({ [roomId]: result }),
          error => Console.error(error)
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
