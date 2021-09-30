import { useCallback } from "react"

import { getAuth } from "hooks/store/useAuth"
import { getRoomData } from "hooks/useRoomData"
import { startGame } from "lib/api/client/startGame"
import { getGameSettings } from "lib/games/settings"
import { RoomStatus } from "lib/model/RoomData"
import { useStore } from "lib/store/context"

export function useStartGame(roomId: string) {
  const reason = useStore(
    useCallback(
      store => {
        const { user } = getAuth(store)
        const room = getRoomData(store, roomId)

        const { minPlayers } = getGameSettings(room.game)

        if (room.status !== RoomStatus.OPENED) {
          return "alreadyStarted"
        } else if (room.playerOrder.length < minPlayers) {
          return "notEnoughPlayers"
        } else if (room.ownerId !== user?.userId) {
          return "notOwner"
        }

        return undefined
      },
      [roomId]
    )
  )

  const trigger = useCallback(() => startGame(roomId), [roomId])

  return [trigger, !!reason, reason] as const
}
