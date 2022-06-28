import { RoomData } from "lib/games/types"
import { getRoomResource, useGlobalStore } from "lib/store/global"
import { Resource } from "lib/utils/resource"
import { useCallback } from "react"

export function useRoomResource(roomId: string): Resource<RoomData> {
  return useGlobalStore(
    useCallback(store => getRoomResource(store, roomId), [roomId])
  )
}
