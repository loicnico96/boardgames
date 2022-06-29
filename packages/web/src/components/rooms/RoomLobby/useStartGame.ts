import { RoomStatus } from "@boardgames/common"
import { useCallback } from "react"

import { useTranslations } from "hooks/useTranslations"
import { startGame } from "lib/api/client/startGame"
import { useAuthContext } from "lib/auth/context"
import { getGameSettings } from "lib/games/settings"
import {
  getRoomResource,
  useGlobalActions,
  useGlobalStore,
} from "lib/store/global"
import { getLoadedResource } from "lib/utils/resource"

export function useStartGame(roomId: string) {
  const { setRoomResources } = useGlobalActions()
  const { user } = useAuthContext()

  const t = useTranslations()

  const reason = useGlobalStore(
    useCallback(
      store => {
        const room = getRoomResource(store, roomId).data

        if (!room) {
          return t.reason.notFoundRoom
        }

        if (!user) {
          return t.reason.notAuthenticated
        }

        if (room.status !== RoomStatus.OPEN) {
          return t.reason.alreadyStarted
        }

        if (room.createdBy !== user.userId) {
          return t.reason.onlyOwnerCanStart
        }

        const { maxPlayers, minPlayers } = getGameSettings(room.game)

        if (room.playerOrder.length < minPlayers) {
          return t.reason.notEnoughPlayers
        }

        if (room.playerOrder.length > maxPlayers) {
          return t.reason.tooManyPlayers
        }

        return undefined
      },
      [roomId, t, user]
    )
  )

  const trigger = useCallback(async () => {
    const room = await startGame(roomId)
    setRoomResources({ [roomId]: getLoadedResource(room) })
  }, [roomId, setRoomResources])

  return [trigger, !reason, reason] as const
}
