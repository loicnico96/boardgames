import { useCallback } from "react"

import { RoomData } from "lib/model/RoomData"
import { Store, useStore } from "lib/store/context"

export function getRoomData(store: Store, roomId: string): RoomData {
  const resource = store.rooms[roomId]

  if (!resource?.data) {
    throw Error("Invalid context - Room is not loaded")
  }

  return resource.data
}

export function useRoomData<T>(
  roomId: string,
  selector: (room: RoomData) => T
): T {
  return useStore(
    useCallback(
      store => selector(getRoomData(store, roomId)),
      [roomId, selector]
    )
  )
}
