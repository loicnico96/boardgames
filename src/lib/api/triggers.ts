import { ApiRequestCreateRoom, ApiResponseCreateRoom } from "./rooms/create"
import { ApiRequestEnterRoom, ApiResponseEnterRoom } from "./rooms/enter"
import { ApiRequestLeaveRoom, ApiResponseLeaveRoom } from "./rooms/leave"

export enum ApiTrigger {
  CREATE_ROOM = "/api/rooms/create",
  ENTER_ROOM = "/api/rooms/enter",
  LEAVE_ROOM = "/api/rooms/leave",
}

export type ApiRequest<T extends ApiTrigger> = {
  [ApiTrigger.CREATE_ROOM]: ApiRequestCreateRoom
  [ApiTrigger.ENTER_ROOM]: ApiRequestEnterRoom
  [ApiTrigger.LEAVE_ROOM]: ApiRequestLeaveRoom
}[T]

export type ApiResponse<T extends ApiTrigger> = {
  [ApiTrigger.CREATE_ROOM]: ApiResponseCreateRoom
  [ApiTrigger.ENTER_ROOM]: ApiResponseEnterRoom
  [ApiTrigger.LEAVE_ROOM]: ApiResponseLeaveRoom
}[T]
