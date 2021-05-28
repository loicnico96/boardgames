import { useCallback } from "react"

import { useAuth } from "hooks/store/useAuth"
import { AsyncHandler } from "hooks/useAsyncHandler"
import { trigger } from "lib/api/client"
import { ApiTrigger } from "lib/api/triggers"
import { WithId } from "lib/db/types"
import { RoomData } from "lib/model/RoomData"

export enum EnterRoomReason {
  ALREADY_IN_ROOM = "alreadyInRoom",
  NOT_AUTHENTICATED = "notAuthenticated",
  NO_USERNAME = "noUserName",
}

export function useEnterRoom(
  room: WithId<RoomData>
): [AsyncHandler<[]>, boolean, EnterRoomReason?] {
  const roomId = room.id

  const { user } = useAuth()

  const enterRoom = useCallback(async () => {
    await trigger(ApiTrigger.ENTER_ROOM, { roomId })
  }, [roomId])

  if (!user) {
    return [enterRoom, false, EnterRoomReason.NOT_AUTHENTICATED]
  } else if (!user.userInfo.userName) {
    return [enterRoom, false, EnterRoomReason.NO_USERNAME]
  } else if (room.playerOrder.includes(user.userId)) {
    return [enterRoom, false, EnterRoomReason.ALREADY_IN_ROOM]
  } else {
    return [enterRoom, true]
  }
}
