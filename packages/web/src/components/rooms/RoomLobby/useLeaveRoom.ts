import { useCallback } from "react"

import { getRoomData } from "hooks/store/useRoomData"
import { leaveRoom } from "lib/api/client/leaveRoom"
import { useAuthContext } from "lib/auth/context"
import { RoomStatus } from "lib/model/RoomData"
import { useGlobalStore } from "lib/store/global"

export function useLeaveRoom(roomId: string) {
  const { user } = useAuthContext()

  const reason = useGlobalStore(
    useCallback(
      store => {
        const room = getRoomData(store, roomId)

        if (room.status !== RoomStatus.OPENED) {
          return "alreadyStarted"
        }

        if (!user) {
          return "notAuthenticated"
        }

        if (room.ownerId === user.userId) {
          return "isOwner"
        }

        if (!room.playerOrder.includes(user.userId)) {
          return "notInRoom"
        }

        return undefined
      },
      [roomId, user]
    )
  )

  const trigger = useCallback(() => leaveRoom(roomId), [roomId])

  return [trigger, !!reason, reason] as const
}
