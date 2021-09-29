import { useCallback } from "react"

import { getAuth } from "hooks/store/useAuth"
import { getRoomData } from "hooks/useRoomData"
import { enterRoom } from "lib/api/client/enterRoom"
import { getGameSettings } from "lib/games"
import { RoomStatus } from "lib/model/RoomData"
import { useStore } from "lib/store/context"

export function useEnterRoom(roomId: string) {
  const reason = useStore(
    useCallback(
      store => {
        const { user } = getAuth(store)
        const room = getRoomData(store, roomId)

        const { maxPlayers } = getGameSettings(room.game)

        if (room.status !== RoomStatus.OPENED) {
          return "alreadyStarted"
        } else if (room.playerOrder.length >= maxPlayers) {
          return "alreadyFull"
        } else if (!user) {
          return "notAuthenticated"
        } else if (room.playerOrder.includes(user.userId)) {
          return "alreadyInRoom"
        } else if (!user.userInfo.userName) {
          return "noUserName"
        }

        return undefined
      },
      [roomId]
    )
  )

  const trigger = useCallback(() => enterRoom(roomId), [roomId])

  return [trigger, !!reason, reason] as const
}
