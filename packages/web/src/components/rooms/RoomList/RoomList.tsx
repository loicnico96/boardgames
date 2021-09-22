import { RoomListItem } from "./RoomListItem"

const rooms = ["id0", "id1", "id2"]

export function RoomList() {
  return (
    <>
      {rooms.map(roomId => (
        <RoomListItem key={roomId} roomId={roomId} />
      ))}
    </>
  )
}
