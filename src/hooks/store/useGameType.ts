import { useParam } from "hooks/useParam"
import { GameType } from "lib/games/GameType"
import { isEnum } from "lib/utils/enums"
import { Param } from "lib/utils/navigation"

export function useGameType(): GameType {
  const game = useParam(Param.GAME_TYPE)
  if (isEnum(game, GameType)) {
    return game
  } else {
    throw Error("Invalid room path - Game type is not defined")
  }
}
