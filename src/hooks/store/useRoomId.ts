import { useRouter } from "next/router"

import { getParam, ParamState } from "hooks/useParamState"

export const ROOM_ID_PARAM = "roomId"

export function useRoomIdParam(): ParamState {
  return getParam(useRouter(), ROOM_ID_PARAM)
}

export function useRoomId(): string {
  const roomId = useRoomIdParam()
  if (roomId) {
    return roomId
  } else {
    throw Error("Invalid room context - Room ID is not defined")
  }
}
