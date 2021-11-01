import styled from "@emotion/styled"

export type PlayerCardProps = {
  playerId: string
}

export const PlayerCardContainer = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border: 1px solid ${props => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 240px;
`

export const PlayerCardRow = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  margin: 4px 0px;
`
