import { useCallback } from "react"

import { getAuth } from "hooks/store/useAuth"
import { getRoomData } from "hooks/store/useRoomData"
import { AsyncHandler } from "hooks/useAsyncHandler"
import { trigger } from "lib/api/client"
import { ApiTrigger } from "lib/api/triggers"
import { useStore } from "lib/store/context"

export enum EnterRoomReason {
  ALREADY_IN_ROOM = "alreadyInRoom",
  NOT_AUTHENTICATED = "notAuthenticated",
  NO_USERNAME = "noUserName",
}

export function useEnterRoom(
  roomId: string
): [AsyncHandler<[]>, boolean, EnterRoomReason?] {
  const reason = useStore(
    useCallback(
      store => {
        const { user } = getAuth(store)
        const room = getRoomData(store, roomId)
        if (!user) {
          return EnterRoomReason.NOT_AUTHENTICATED
        } else if (!user.userInfo.userName) {
          return EnterRoomReason.NO_USERNAME
        } else if (room.playerOrder.includes(user.userId)) {
          return EnterRoomReason.ALREADY_IN_ROOM
        } else {
          return undefined
        }
      },
      [roomId]
    )
  )

  const enterRoom = useCallback(async () => {
    await trigger(ApiTrigger.ENTER_ROOM, { roomId })
  }, [roomId])

  return [enterRoom, !reason, reason]
}
