import { GamePhase } from "@boardgames/roborally"
import styled from "@emotion/styled"

import { useCurrentUserId } from "hooks/useCurrentUserId"

import { Card } from "./Card"
import {
  useRoborallyActions,
  useRoborallyPlayer,
  useRoborallyState,
  useRoborallyStore,
} from "./store"

export type PlayerProgramProps = {
  playerId: string
}

const Container = styled.div`
  display: flex;
  gap: 0px 12px;
`

export function PlayerProgram({ playerId }: PlayerProgramProps) {
  const lockedProgram = useRoborallyPlayer(playerId, player => player.program)
  const ready = useRoborallyPlayer(playerId, player => player.ready)
  const phase = useRoborallyState(state => state.phase)

  const { program } = useRoborallyStore()
  const { removeProgram } = useRoborallyActions()

  const fullProgram = lockedProgram.map((card, index) => card ?? program[index])

  const userId = useCurrentUserId()

  const isProgramming =
    !ready && userId === playerId && phase === GamePhase.PROGRAM

  return (
    <Container>
      {fullProgram.map((card, index) => (
        <Card
          key={index}
          card={card}
          disabled={
            isProgramming && card !== null && lockedProgram[index] !== null
          }
          onClick={
            isProgramming && card !== null
              ? () => removeProgram(index)
              : undefined
          }
        />
      ))}
    </Container>
  )
}
