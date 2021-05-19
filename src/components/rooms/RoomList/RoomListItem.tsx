import React from "react"

import Link from "components/ui/Link"
import { WithId } from "lib/db/types"
import { RoomData } from "lib/model/RoomData"
import { ROUTES } from "lib/utils/navigation"

export type RoomListItemProps = {
  room: WithId<RoomData>
}

export default function RoomListItem({ room }: RoomListItemProps) {
  return (
    <Link href={ROUTES.room(room.id)}>
      <div>{JSON.stringify(room)}</div>
    </Link>
  )
}
