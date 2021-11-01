import styled from "@emotion/styled"

import { useCurrentUserId } from "hooks/store/useCurrentUserId"

import { ForestDisplay } from "./ForestDisplay"
import { GameBoard } from "./GameBoard"
import { PlayerHand } from "./PlayerHand"
import { useCacaoState } from "./store"

const GameViewContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`

export function GameView() {
  const userId = useCurrentUserId()

  const player = useCacaoState(state =>
    userId ? state.players[userId] ?? null : null
  )

  return (
    <GameViewContainer>
      {userId !== null && player !== null && <PlayerHand playerId={userId} />}
      <ForestDisplay />
      <GameBoard />
    </GameViewContainer>
  )
}
