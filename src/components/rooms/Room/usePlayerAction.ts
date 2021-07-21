import { useCallback } from "react"

import { AsyncHandler } from "hooks/useAsyncHandler"
import { trigger } from "lib/api/client"
import { ApiTrigger } from "lib/api/triggers"
import { GameAction } from "lib/games/GameSettings"
import { GameType } from "lib/games/GameType"

export function usePlayerAction<T extends GameType>(
  game: T,
  roomId: string
): AsyncHandler<[action: GameAction<T>]> {
  return useCallback(
    async (action: GameAction<T>) => {
      await trigger(ApiTrigger.PLAYER_ACTION, { action, game, roomId })
    },
    [game, roomId]
  )
}
