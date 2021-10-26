import { useCallback } from "react"

import { playerAction } from "lib/api/client/playerAction"
import { GameAction, GameType } from "lib/games/types"

import { useRoomId } from "./useRoomId"

export function usePlayerAction<T extends GameType>(
  game: T
): (action: GameAction<T>) => Promise<boolean> {
  const roomId = useRoomId()

  return useCallback(
    async (action: GameAction<T>) => {
      const { success } = await playerAction(game, roomId, action)
      return success
    },
    [game, roomId]
  )
}
