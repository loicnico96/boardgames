import React from "react"

import { WithId } from "lib/db/types"
import { RoomData } from "lib/model/RoomData"

export type RoomProps = {
  room: WithId<RoomData>
}

export default function Room({ room }: RoomProps) {
  return <div>{room.status}</div>
}
