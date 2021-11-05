import { useCallback } from "react"

import { useRoomId } from "hooks/useRoomId"
import { GamePlayer, GameType } from "lib/games/types"
import { useGlobalStore } from "lib/store/global"

import { getGameResource } from "./useGameResource"

export function useGamePlayer<T extends GameType, R>(
  game: T,
  playerId: string,
  selector: (state: GamePlayer<T>) => R
): R {
  const roomId = useRoomId()

  return useGlobalStore(
    useCallback(
      store => {
        const resource = getGameResource(store, game, roomId)

        if (!resource.data?.players[playerId]) {
          throw Error("Invalid game context")
        }

        return selector(resource.data.players[playerId])
      },
      [game, playerId, roomId, selector]
    )
  )
}

export function makeUseGamePlayer<T extends GameType>(
  game: T
): <R>(playerId: string, selector: (state: GamePlayer<T>) => R) => R {
  return (playerId, selector) => useGamePlayer(game, playerId, selector)
}
