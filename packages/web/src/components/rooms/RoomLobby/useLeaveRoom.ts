import { useCallback } from "react"

import { getAuth } from "hooks/store/useAuth"
import { getRoomData } from "hooks/useRoomData"
import { leaveRoom } from "lib/api/client/leaveRoom"
import { RoomStatus } from "lib/model/RoomData"
import { useGlobalStore } from "lib/store/global"

export function useLeaveRoom(roomId: string) {
  const reason = useGlobalStore(
    useCallback(
      store => {
        const { user } = getAuth(store)
        const room = getRoomData(store, roomId)

        if (room.status !== RoomStatus.OPENED) {
          return "alreadyStarted"
        } else if (!user) {
          return "notAuthenticated"
        } else if (room.ownerId === user.userId) {
          return "isOwner"
        } else if (!room.playerOrder.includes(user.userId)) {
          return "notInRoom"
        }

        return undefined
      },
      [roomId]
    )
  )

  const trigger = useCallback(() => leaveRoom(roomId), [roomId])

  return [trigger, !!reason, reason] as const
}
