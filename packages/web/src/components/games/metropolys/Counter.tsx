import { Text } from "@boardgames/components"

import { useGameState } from "hooks/useGameState"

export function Counter() {
  const min = useGameState("metropolys", state => state.state)

  const max = useGameState("metropolys", state => state.count)

  return (
    <>
      <Text>
        {min} / {max}
      </Text>
    </>
  )
}
