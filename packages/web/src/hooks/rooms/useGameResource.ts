import { GameState, GameType } from "lib/games/types"
import { getGameResource, useGlobalStore } from "lib/store/global"
import { Resource } from "lib/utils/resource"
import { useCallback } from "react"

export function useGameResource<T extends GameType>(
  game: T,
  roomId: string
): Resource<GameState<T>> {
  return useGlobalStore(
    useCallback(store => getGameResource(store, game, roomId), [game, roomId])
  )
}
