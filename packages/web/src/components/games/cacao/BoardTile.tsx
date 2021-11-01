import styled from "@emotion/styled"

export type BoardTileProps = {
  background?: string
  rot?: number
}

export const BoardTile = styled.div<BoardTileProps>`
  align-items: center;
  background-color: ${props => props.background ?? "lightgray"};
  border: 1px black solid;
  display: flex;
  height: 60px;
  justify-content: center;
  text-align: center;
  transform: rotate(${props => (props.rot ?? 0) * 90}deg);
  width: 60px;
`
