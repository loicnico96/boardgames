import { useCallback } from "react"

import { getAuth } from "hooks/store/useAuth"
import { getRoomData } from "hooks/store/useRoomData"
import { AsyncHandler } from "hooks/useAsyncHandler"
import { leaveRoom } from "lib/api/client/leaveRoom"
import { useStore } from "lib/store/context"

export enum LeaveRoomReason {
  IS_OWNER = "isOwner",
  NOT_AUTHENTICATED = "notAuthenticated",
  NOT_IN_ROOM = "notInRoom",
}

export function useLeaveRoom(
  roomId: string
): [AsyncHandler<[]>, boolean, LeaveRoomReason?] {
  const reason = useStore(
    useCallback(
      store => {
        const { user } = getAuth(store)
        const room = getRoomData(store, roomId)
        if (!user) {
          return LeaveRoomReason.NOT_AUTHENTICATED
        } else if (user.userId === room.ownerId) {
          return LeaveRoomReason.IS_OWNER
        } else if (!room.playerOrder.includes(user.userId)) {
          return LeaveRoomReason.NOT_IN_ROOM
        } else {
          return undefined
        }
      },
      [roomId]
    )
  )

  const trigger = useCallback(async () => leaveRoom(roomId), [roomId])

  return [trigger, !reason, reason]
}
