import { assert } from "@boardgames/utils"
import { GameType } from "lib/games/types"
import { GameData } from "lib/model/GameData"
import { getGameResource, useGlobalStore } from "lib/store/global"
import { Selector } from "lib/store/utils"
import { useCallback } from "react"

export function useGameData<T extends GameType, R>(
  game: T,
  roomId: string,
  selector: Selector<GameData<T>, R>
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
