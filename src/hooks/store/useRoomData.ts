import { useCallback } from "react"

import { RoomData } from "lib/model/RoomData"
import { Store, useStore } from "lib/store/context"

import { getRoomResource } from "./useRoomResource"

export function getRoomData(store: Store, roomId: string): RoomData {
  const { data } = getRoomResource(store, roomId)

  if (data) {
    return data
  }

  throw Error(`Room ${roomId} is not loaded`)
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