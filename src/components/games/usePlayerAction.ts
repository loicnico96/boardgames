import { useCallback } from "react"

import { AsyncHandler } from "hooks/useAsyncHandler"
import { playerAction } from "lib/api/client/playerAction"
import { GameAction } from "lib/games/GameSettings"
import { GameType } from "lib/games/GameType"

export function usePlayerAction<T extends GameType>(
  game: T,
  roomId: string
): AsyncHandler<[action: GameAction<T>]> {
  return useCallback(
    async (action: GameAction<T>) => playerAction(game, roomId, action),
    [game, roomId]
  )
}
