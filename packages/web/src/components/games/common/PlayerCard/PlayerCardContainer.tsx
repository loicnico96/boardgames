import styled from "@emotion/styled"

export const PlayerCardContainer = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border: 1px solid ${props => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 240px;
`
