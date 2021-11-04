import { useCallback } from "react"

import { getRoomData } from "hooks/store/useRoomData"
import { enterRoom } from "lib/api/client/enterRoom"
import { useAuthContext } from "lib/auth/context"
import { SETTINGS } from "lib/games/settings"
import { RoomStatus } from "lib/model/RoomData"
import { useGlobalStore } from "lib/store/global"

export function useEnterRoom(roomId: string) {
  const { user } = useAuthContext()

  const reason = useGlobalStore(
    useCallback(
      store => {
        if (!user) {
          return "notAuthenticated"
        }

        const room = getRoomData(store, roomId)

        if (room.status !== RoomStatus.OPENED) {
          return "alreadyStarted"
        }

        if (room.playerOrder.includes(user.userId)) {
          return "alreadyInRoom"
        }

        const { maxPlayers } = SETTINGS[room.game]

        if (room.playerOrder.length >= maxPlayers) {
          return "alreadyFull"
        }

        if (!user.userInfo.userName) {
          return "noUserName"
        }

        return undefined
      },
      [roomId, user]
    )
  )

  const trigger = useCallback(() => enterRoom(roomId), [roomId])

  return [trigger, !!reason, reason] as const
}
