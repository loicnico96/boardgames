import styled from "@emotion/styled"

import { ForestDisplay } from "./ForestDisplay"
import { GameBoard } from "./GameBoard"
import { PlayerHand } from "./PlayerHand"

const GameViewContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`

export type GameViewProps = {
  playerId: string | null
}

export function GameView({ playerId }: GameViewProps) {
  return (
    <GameViewContainer>
      {playerId !== null && <PlayerHand playerId={playerId} />}
      <ForestDisplay />
      <GameBoard />
    </GameViewContainer>
  )
}
