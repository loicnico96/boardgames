import { useCallback } from "react"

import { GameState, GameType } from "lib/games/types"
import { Store, useStore } from "lib/store/context"
import { Resource } from "lib/utils/resource"

export function getGameResource<T extends GameType>(
  store: Store,
  game: T,
  roomId: string
): Resource<GameState<T>> | undefined {
  return store.games[game][roomId]
}

export function useGameResource<T extends GameType>(
  game: T,
  roomId: string
): Resource<GameState<T>> | undefined {
  return useStore(
    useCallback(store => getGameResource(store, game, roomId), [game, roomId])
  )
}
