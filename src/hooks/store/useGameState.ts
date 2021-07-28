import { GameState } from "lib/games/GameSettings"
import { GameType } from "lib/games/GameType"
import { Store, useComplexStore } from "lib/store/context"

import { getGameResource } from "./useGameResource"
import { useRoomId } from "./useRoomId"

export function getGameState<T extends GameType>(
  store: Store,
  game: T,
  roomId: string
): GameState<T> {
  const { data } = getGameResource(store, game, roomId)

  if (data) {
    return data
  }

  throw Error(`Game ${roomId} is not loaded`)
}

export function useGameState<T extends GameType, U>(
  game: T,
  selector: (room: GameState<T>) => U
): U {
  const roomId = useRoomId()
  return useComplexStore(getGameState, selector, game, roomId)
}
