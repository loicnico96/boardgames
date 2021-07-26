import { useParam } from "hooks/useParam"
import { Param } from "lib/utils/navigation"

export function useRoomId(): string {
  const roomId = useParam(Param.ROOM_ID)
  if (roomId) {
    return roomId
  } else {
    throw Error("Invalid room path - Room ID is not defined")
  }
}
