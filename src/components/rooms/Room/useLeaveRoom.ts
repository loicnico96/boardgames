import { useCallback } from "react"

import { useAuth } from "hooks/store/useAuth"
import { AsyncHandler } from "hooks/useAsyncHandler"
import { trigger } from "lib/api/client"
import { ApiTrigger } from "lib/api/triggers"
import { WithId } from "lib/db/types"
import { RoomData } from "lib/model/RoomData"

export enum LeaveRoomReason {
  IS_OWNER = "isOwner",
  NOT_AUTHENTICATED = "notAuthenticated",
  NOT_IN_ROOM = "notInRoom",
}

export function useLeaveRoom(
  room: WithId<RoomData>
): [AsyncHandler<[]>, boolean, LeaveRoomReason?] {
  const roomId = room.id

  const { user } = useAuth()

  const leaveRoom = useCallback(async () => {
    await trigger(ApiTrigger.LEAVE_ROOM, { roomId })
  }, [roomId])

  if (!user) {
    return [leaveRoom, false, LeaveRoomReason.NOT_AUTHENTICATED]
  } else if (user.userId === room.ownerId) {
    return [leaveRoom, false, LeaveRoomReason.IS_OWNER]
  } else if (!room.playerOrder.includes(user.userId)) {
    return [leaveRoom, false, LeaveRoomReason.NOT_IN_ROOM]
  } else {
    return [leaveRoom, true]
  }
}
