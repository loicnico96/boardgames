import { Param } from "lib/utils/navigation"

import { useParam } from "./useParam"

export function useRoomId(): string {
  const roomId = useParam(Param.ROOM_ID)

  if (!roomId) {
    throw Error("Invalid room path - Room ID is not defined")
  }

  return roomId
}
