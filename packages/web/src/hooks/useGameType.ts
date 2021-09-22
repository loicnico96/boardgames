import { GameType, isGameType } from "lib/games"
import { Param } from "lib/utils/navigation"

import { useParam } from "./useParam"

export function useGameType(): GameType {
  const game = useParam(Param.GAME_TYPE)

  if (!isGameType(game)) {
    throw Error("Invalid room path - Game type is not defined")
  }

  return game
}
