import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"
import { toast } from "react-toastify"

import { useTranslations } from "hooks/useTranslations"
import { createRoom } from "lib/api/client/createRoom"
import { useAuthContext } from "lib/auth/context"
import { GameType } from "lib/games/types"
import { useGlobalActions } from "lib/store/global"
import { Console } from "lib/utils/logger"
import { ROUTES } from "lib/utils/navigation"
import { getLoadedResource } from "lib/utils/resource"

export function useCreateRoom(game: GameType | null) {
  const { setRoomResources } = useGlobalActions()
  const { user } = useAuthContext()

  const router = useRouter()

  const t = useTranslations()

  const reason = useMemo(() => {
    if (!user) {
      return t.reason.notAuthenticated
    }

    if (!user.userInfo.userName) {
      return t.reason.noUserName
    }

    if (!game) {
      return t.reason.noGameSelected
    }

    return undefined
  }, [game, t, user])

  const trigger = useCallback(async () => {
    if (game) {
      const room = await createRoom(game)
      setRoomResources({ [room.id]: getLoadedResource(room) })
      toast.success(t.roomList.createRoom.success)
      router.push(ROUTES.room(game, room.id)).catch(Console.error)
    }
  }, [game, router, setRoomResources, t])

  return [trigger, !reason, reason] as const
}
