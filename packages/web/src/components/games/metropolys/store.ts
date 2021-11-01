import { makeUseGamePlayer } from "hooks/store/useGamePlayer"
import { makeUseGameState } from "hooks/store/useGameState"
import { GameType } from "lib/games/types"

export const useMetropolysState = makeUseGameState(GameType.METROPOLYS)

export const useMetropolysPlayer = makeUseGamePlayer(GameType.METROPOLYS)
