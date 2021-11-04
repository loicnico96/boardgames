import { useCallback } from "react"

import { useRoomId } from "hooks/useRoomId"
import { GameState, GameType } from "lib/games/types"
import { useGlobalStore } from "lib/store/global"
import { getLoadingResource, Resource } from "lib/utils/resource"

export function useGameResource<T extends GameType, R>(
  game: T,
  selector: (resource: Resource<GameState<T>>) => R
): R {
  const roomId = useRoomId()

  return useGlobalStore(
    useCallback(
      store => {
        const resource = store.games[game].rooms[roomId]
        return selector(resource ?? getLoadingResource())
      },
      [game, roomId, selector]
    )
  )
}
