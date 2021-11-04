import { useCallback } from "react"

import { RoomData } from "lib/model/RoomData"
import { GlobalStore, useGlobalStore } from "lib/store/global"

export function getRoomData(store: GlobalStore, roomId: string): RoomData {
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
  return useGlobalStore(
    useCallback(
      store => selector(getRoomData(store, roomId)),
      [roomId, selector]
    )
  )
}
