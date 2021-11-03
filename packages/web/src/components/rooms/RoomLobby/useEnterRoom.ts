import { useCallback } from "react"

import { getRoomData } from "hooks/useRoomData"
import { enterRoom } from "lib/api/client/enterRoom"
import { useAuthContext } from "lib/auth/context"
import { getGameSettings } from "lib/games/settings"
import { RoomStatus } from "lib/model/RoomData"
import { useGlobalStore } from "lib/store/global"

export function useEnterRoom(roomId: string) {
  const { user } = useAuthContext()

  const reason = useGlobalStore(
    useCallback(
      store => {
        const room = getRoomData(store, roomId)

        const { maxPlayers } = getGameSettings(room.game)

        if (room.status !== RoomStatus.OPENED) {
          return "alreadyStarted"
        }

        if (room.playerOrder.length >= maxPlayers) {
          return "alreadyFull"
        }

        if (!user) {
          return "notAuthenticated"
        }

        if (room.playerOrder.includes(user.userId)) {
          return "alreadyInRoom"
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
