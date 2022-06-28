import { RoomData } from "@boardgames/common"
import styled from "@emotion/styled"

import { RouterLink } from "components/ui/RouterLink"
import { WithId } from "lib/firebase/firestore"
import { isGameType } from "lib/games/types"
import { ROUTES } from "lib/utils/navigation"

export type RoomListItemProps = {
  room: WithId<RoomData>
}

const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 8px solid ${props => props.theme.colors.secondary};
  border-radius: 16px;
  margin-bottom: 24px;
  padding: 16px 24px;
`

export function RoomListItem({ room }: RoomListItemProps) {
  if (!isGameType(room.game)) {
    return null
  }

  return (
    <RouterLink href={ROUTES.room(room.game, room.id)}>
      <Container>
        {room.id} - {room.createdAt}
      </Container>
    </RouterLink>
  )
}
