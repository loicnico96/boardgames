import { useCallback } from "react"

import { getAuth } from "hooks/store/useAuth"
import { getRoomData } from "hooks/useRoomData"
import { closeRoom } from "lib/api/client/closeRoom"
import { RoomStatus } from "lib/model/RoomData"
import { useStore } from "lib/store/context"

export function useCloseRoom(roomId: string) {
  const reason = useStore(
    useCallback(
      store => {
        const { user } = getAuth(store)
        const room = getRoomData(store, roomId)

        if (room.status !== RoomStatus.OPENED) {
          return "alreadyStarted"
        } else if (room.ownerId !== user?.userId) {
          return "notOwner"
        }

        return undefined
      },
      [roomId]
    )
  )

  const trigger = useCallback(() => closeRoom(roomId), [roomId])

  return [trigger, !!reason, reason] as const
}
