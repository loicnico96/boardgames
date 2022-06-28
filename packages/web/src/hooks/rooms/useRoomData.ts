import { assert } from "@boardgames/utils"
import { RoomData } from "lib/games/types"
import { getRoomResource, useGlobalStore } from "lib/store/global"
import { Selector } from "lib/store/utils"
import { useCallback } from "react"

export function useRoomData<R>(
  roomId: string,
  selector: Selector<RoomData, R>
): R {
  return useGlobalStore(
    useCallback(
      store => {
        const { data } = getRoomResource(store, roomId)
        assert(!!data, "Invalid context - Room is not loaded")
        return selector(data)
      },
      [roomId, selector]
    )
  )
}
