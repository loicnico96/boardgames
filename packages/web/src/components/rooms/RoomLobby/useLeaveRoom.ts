import { useCallback } from "react"

import { useTranslations } from "hooks/useTranslations"
import { leaveRoom } from "lib/api/client/leaveRoom"
import { useAuthContext } from "lib/auth/context"
import { RoomStatus } from "lib/model/RoomData"
import {
  getRoomResource,
  useGlobalActions,
  useGlobalStore,
} from "lib/store/global"
import { getLoadedResource } from "lib/utils/resource"

export function useLeaveRoom(roomId: string) {
  const { setRoomResources } = useGlobalActions()
  const { user } = useAuthContext()

  const t = useTranslations()

  const reason = useGlobalStore(
    useCallback(
      store => {
        const room = getRoomResource(store, roomId).data

        if (!room) {
          return t.reason.notFoundRoom
        }

        if (!user) {
          return t.reason.notAuthenticated
        }

        if (room.status !== RoomStatus.OPENED) {
          return t.reason.alreadyStarted
        }

        if (room.createdBy === user.userId) {
          return t.reason.isOwner
        }

        if (!room.playerOrder.includes(user.userId)) {
          return t.reason.notInRoom
        }

        return undefined
      },
      [roomId, t, user]
    )
  )

  const trigger = useCallback(async () => {
    const room = await leaveRoom(roomId)
    setRoomResources({ [roomId]: getLoadedResource(room) })
  }, [roomId, setRoomResources])

  return [trigger, !reason, reason] as const
}
