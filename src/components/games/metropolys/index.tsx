import styled from "@emotion/styled"

import { useGameState } from "hooks/store/useGameState"
import { GameType } from "lib/games/GameType"

const ContentWrapper = styled.div`
  background-color: lightgray;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const ContentMain = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  overflow: hidden;
`

const BoardContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: start;
`

const BoardViewport = styled.div`
  margin: 24px;
  position: relative;
`

const SidePanel = styled.div``

const PlayerCardContainer = styled.div`
  align-items: center;
  background-color: #aaa;
  border-color: #888;
  border-style: solid;
  border-width: 1px;
  display: flex;
  flex-direction: row;
  padding: 16px;
`

const PlayerCardContentContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`

const PlayerCardContentRow = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  margin: 4px 0px;
`

export default function Metropolys() {
  const [playerOrder, players, scores] = useGameState(
    GameType.METROPOLYS,
    s => [s.playerOrder, s.players, s.scores]
  )

  return (
    <ContentWrapper>
      <ContentMain>
        <BoardContainer>
          <BoardViewport>
            <img />
          </BoardViewport>
        </BoardContainer>
        <SidePanel>
          {playerOrder.map(playerId => (
            <PlayerCardContainer key={playerId}>
              <PlayerCardContentContainer>
                <PlayerCardContentRow>
                  {players[playerId].name}
                </PlayerCardContentRow>
                <PlayerCardContentRow>
                  Score:{" "}
                  {scores.find(score => score.playerId === playerId)?.score ??
                    0}
                </PlayerCardContentRow>
              </PlayerCardContentContainer>
            </PlayerCardContainer>
          ))}
        </SidePanel>
      </ContentMain>
    </ContentWrapper>
  )
}
