import styled from "@emotion/styled"

export type BoardTileProps = {
  background?: string
  disabled?: boolean
  onClick?: () => void
  rot?: number
  selected?: boolean
}

export const BoardTile = styled.div<BoardTileProps>`
  align-items: center;
  background-color: ${props => props.background ?? "lightgray"};
  border: ${props => (props.selected ? 3 : 1)}px black solid;
  cursor: ${props =>
    props.onClick ? (props.disabled ? "not-allowed" : "pointer") : "default"};
  display: flex;
  height: 60px;
  justify-content: center;
  text-align: center;
  transform: rotate(${props => (props.rot ?? 0) * 90}deg);
  width: 60px;
`
