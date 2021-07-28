import { GameState } from "lib/games/GameSettings"
import { GameType } from "lib/games/GameType"
import { Store, useComplexStore } from "lib/store/context"
import { LOADING, Resource } from "lib/utils/resources"

import { useRoomId } from "./useRoomId"

export function getGameResource<T extends GameType>(
  store: Store,
  game: T,
  roomId: string
): Resource<GameState<T>> {
  return (store.games[game][roomId] as Resource<GameState<T>>) ?? LOADING
}

export function useGameResource<T extends GameType, U>(
  game: T,
  selector: (resource: Resource<GameState<T>>) => U
): U {
  const roomId = useRoomId()
  return useComplexStore(getGameResource, selector, game, roomId)
}
