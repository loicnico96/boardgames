import { useCallback } from "react"

import { GameState, GameType } from "lib/games/types"
import { Store, useStore } from "lib/store/context"

import { getGameResource } from "./useGameResource"
import { useRoomId } from "./useRoomId"

export function getGameState<T extends GameType>(
  store: Store,
  game: T,
  roomId: string
): GameState<T> {
  const resource = getGameResource(store, game, roomId)

  if (!resource?.data) {
    throw Error("Invalid context - Game is not loaded")
  }

  return resource.data
}

export function useGameState<T extends GameType, R>(
  game: T,
  selector: (state: GameState<T>) => R
): R {
  const roomId = useRoomId()

  return useStore(
    useCallback(
      store => selector(getGameState(store, game, roomId)),
      [game, roomId, selector]
    )
  )
}
