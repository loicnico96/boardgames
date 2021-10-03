import { Text } from "@boardgames/components"

import { useGameState } from "hooks/useGameState"
import { GameType } from "lib/games/types"

export function Counter() {
  const min = useGameState(GameType.METROPOLYS, state => state.state)

  const max = useGameState(GameType.METROPOLYS, state => state.count)

  return (
    <>
      <Text>
        {min} / {max}
      </Text>
    </>
  )
}
