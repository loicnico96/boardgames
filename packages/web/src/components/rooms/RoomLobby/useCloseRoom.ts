import { useCallback } from "react"
import { toast } from "react-toastify"

import { useTranslations } from "hooks/useTranslations"
import { closeRoom } from "lib/api/client/closeRoom"
import { useAuthContext } from "lib/auth/context"
import { RoomStatus } from "lib/model/RoomData"
import { getRoomResource, useGlobalStore } from "lib/store/global"

export function useCloseRoom(roomId: string) {
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

        if (room.createdBy !== user.userId) {
          return t.reason.onlyOwnerCanClose
        }

        return undefined
      },
      [roomId, t, user]
    )
  )

  const trigger = useCallback(async () => {
    await closeRoom(roomId)
    toast.success(t.room.closeRoom.success)
  }, [roomId, t])

  return [trigger, !reason, reason] as const
}
