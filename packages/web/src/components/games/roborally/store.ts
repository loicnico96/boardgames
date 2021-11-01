import { makeUseGamePlayer } from "hooks/store/useGamePlayer"
import { makeUseGameState } from "hooks/store/useGameState"
import { GameType } from "lib/games/types"

export const useRoborallyState = makeUseGameState(GameType.ROBORALLY)

export const useRoborallyPlayer = makeUseGamePlayer(GameType.ROBORALLY)
