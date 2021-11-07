import styled from "@emotion/styled"

import { useCurrentUserId } from "hooks/useCurrentUserId"
import { GamePhase } from "lib/games/roborally/model"

import { Card } from "./Card"
import {
  useRoborallyActions,
  useRoborallyPlayer,
  useRoborallyState,
  useRoborallyStore,
} from "./store"

export type PlayerHandProps = {
  playerId: string
}

const Container = styled.div`
  display: flex;
  gap: 0px 12px;
`

export function PlayerHand({ playerId }: PlayerHandProps) {
  const hand = useRoborallyPlayer(playerId, player => player.hand)
  const ready = useRoborallyPlayer(playerId, player => player.ready)
  const lockedProgram = useRoborallyPlayer(playerId, player => player.program)
  const phase = useRoborallyState(state => state.phase)

  const { program } = useRoborallyStore()
  const { addProgram } = useRoborallyActions()

  const fullProgram = lockedProgram.map((card, index) => card ?? program[index])

  const userId = useCurrentUserId()

  const isProgramming =
    !ready &&
    userId === playerId &&
    phase === GamePhase.PROGRAM &&
    fullProgram.includes(null)

  return (
    <Container>
      {hand
        .filter(card => !program.includes(card))
        .map((card, index) => (
          <Card
            key={index}
            card={card}
            onClick={isProgramming ? () => addProgram(card) : undefined}
          />
        ))}
    </Container>
  )
}
