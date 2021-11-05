import { useCallback } from "react"

import { useRoomId } from "hooks/useRoomId"
import { GameState, GameType } from "lib/games/types"
import { useGlobalStore } from "lib/store/global"

import { getGameResource } from "./useGameResource"

export function useGameState<T extends GameType, R>(
  game: T,
  selector: (state: GameState<T>) => R
): R {
  const roomId = useRoomId()

  return useGlobalStore(
    useCallback(
      store => {
        const resource = getGameResource(store, game, roomId)

        if (!resource.data) {
          throw Error("Invalid game context")
        }

        return selector(resource.data)
      },
      [game, roomId, selector]
    )
  )
}

export function makeUseGameState<T extends GameType>(
  game: T
): <R>(selector: (state: GameState<T>) => R) => R {
  return selector => useGameState(game, selector)
}
