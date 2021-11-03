import { useCallback } from "react"

import { getRoomData } from "hooks/useRoomData"
import { closeRoom } from "lib/api/client/closeRoom"
import { useAuthContext } from "lib/auth/context"
import { RoomStatus } from "lib/model/RoomData"
import { useGlobalStore } from "lib/store/global"

export function useCloseRoom(roomId: string) {
  const { user } = useAuthContext()

  const reason = useGlobalStore(
    useCallback(
      store => {
        const room = getRoomData(store, roomId)

        if (room.status !== RoomStatus.OPENED) {
          return "alreadyStarted"
        }

        if (room.ownerId !== user?.userId) {
          return "notOwner"
        }

        return undefined
      },
      [roomId, user]
    )
  )

  const trigger = useCallback(() => closeRoom(roomId), [roomId])

  return [trigger, !!reason, reason] as const
}
