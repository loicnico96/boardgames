import { makeUseGamePlayer } from "hooks/store/useGamePlayer"
import { makeUseGameState } from "hooks/store/useGameState"
import { GameType } from "lib/games/types"

export const useCacaoState = makeUseGameState(GameType.CACAO)

export const useCacaoPlayer = makeUseGamePlayer(GameType.CACAO)
