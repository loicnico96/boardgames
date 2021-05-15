import React from "react"

import { WithId } from "lib/db/types"
import { RoomData } from "lib/model/RoomData"

import RoomListItem from "./RoomListItem"

export type RoomListProps = {
  rooms: WithId<RoomData>[]
}

export default function RoomList({ rooms }: RoomListProps) {
  return (
    <div>
      {rooms.map(room => (
        <RoomListItem key={room.id} room={room} />
      ))}
    </div>
  )
}
