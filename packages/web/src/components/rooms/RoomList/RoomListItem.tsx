import styled from "@emotion/styled"

export type RoomListItemProps = {
  roomId: string
}

const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 8px solid ${props => props.theme.colors.secondary};
  border-radius: 16px;
  margin-bottom: 24px;
  padding: 16px 24px;
`

export function RoomListItem({ roomId }: RoomListItemProps) {
  return <Container>{roomId}</Container>
}
