import { useCallback } from "react"

import { GameState, GameType } from "lib/games/types"
import { GlobalStore, useGlobalStore } from "lib/store/global"
import { getLoadingResource, Resource } from "lib/utils/resource"

export function getGameResource<T extends GameType>(
  store: GlobalStore,
  game: T,
  roomId: string
): Resource<GameState<T>> {
  return store.games[game].rooms[roomId] ?? getLoadingResource()
}

export function useGameResource<T extends GameType, R>(
  game: T,
  roomId: string,
  selector: (resource: Resource<GameState<T>>) => R
): R {
  return useGlobalStore(
    useCallback(
      store => selector(getGameResource(store, game, roomId)),
      [game, roomId, selector]
    )
  )
}
