import { useCallback } from "react"

import { getRoomData } from "hooks/useRoomData"
import { startGame } from "lib/api/client/startGame"
import { useAuthContext } from "lib/auth/context"
import { getGameSettings } from "lib/games/settings"
import { RoomStatus } from "lib/model/RoomData"
import { useGlobalStore } from "lib/store/global"

export function useStartGame(roomId: string) {
  const { user } = useAuthContext()

  const reason = useGlobalStore(
    useCallback(
      store => {
        const room = getRoomData(store, roomId)

        const { minPlayers } = getGameSettings(room.game)

        if (room.status !== RoomStatus.OPENED) {
          return "alreadyStarted"
        }

        if (room.playerOrder.length < minPlayers) {
          return "notEnoughPlayers"
        }

        if (room.ownerId !== user?.userId) {
          return "notOwner"
        }

        return undefined
      },
      [roomId, user]
    )
  )

  const trigger = useCallback(() => startGame(roomId), [roomId])

  return [trigger, !!reason, reason] as const
}
