import { useCallback } from "react"

import { RoomData } from "lib/model/RoomData"
import { Store, useStore } from "lib/store/context"
import { LOADING, Resource } from "lib/utils/resources"

export function getRoomResource(
  store: Store,
  roomId: string | null
): Resource<RoomData> {
  return roomId ? store.rooms[roomId] ?? LOADING : LOADING
}

export function useRoomResource<T>(
  roomId: string | null,
  selector: (resource: Resource<RoomData>) => T
): T {
  return useStore(
    useCallback(
      store => selector(getRoomResource(store, roomId)),
      [roomId, selector]
    )
  )
}
