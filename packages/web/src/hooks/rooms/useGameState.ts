import { assert } from "@boardgames/utils"
import { GameState, GameType } from "lib/games/types"
import { getGameResource, useGlobalStore } from "lib/store/global"
import { Selector } from "lib/store/utils"
import { useCallback } from "react"

export function useGameState<T extends GameType, R>(
  game: T,
  roomId: string,
  selector: Selector<GameState<T>, R>
): R {
  return useGlobalStore(
    useCallback(
      store => {
        const { data } = getGameResource(store, game, roomId)
        assert(!!data, "Invalid context - Game is not loaded")
        return selector(data)
      },
      [game, roomId, selector]
    )
  )
}
