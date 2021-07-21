import { ApiRequestGameAction, ApiResponseGameAction } from "./rooms/action"
import { ApiRequestCreateRoom, ApiResponseCreateRoom } from "./rooms/create"
import { ApiRequestEnterRoom, ApiResponseEnterRoom } from "./rooms/enter"
import { ApiRequestLeaveRoom, ApiResponseLeaveRoom } from "./rooms/leave"
import { ApiRequestStartGame, ApiResponseStartGame } from "./rooms/start"

export enum ApiTrigger {
  PLAYER_ACTION = "/api/rooms/action",
  CREATE_ROOM = "/api/rooms/create",
  ENTER_ROOM = "/api/rooms/enter",
  LEAVE_ROOM = "/api/rooms/leave",
  START_GAME = "/api/rooms/start",
}

export type ApiRequest<T extends ApiTrigger> = {
  [ApiTrigger.PLAYER_ACTION]: ApiRequestGameAction
  [ApiTrigger.CREATE_ROOM]: ApiRequestCreateRoom
  [ApiTrigger.ENTER_ROOM]: ApiRequestEnterRoom
  [ApiTrigger.LEAVE_ROOM]: ApiRequestLeaveRoom
  [ApiTrigger.START_GAME]: ApiRequestStartGame
}[T]

export type ApiResponse<T extends ApiTrigger> = {
  [ApiTrigger.PLAYER_ACTION]: ApiResponseGameAction
  [ApiTrigger.CREATE_ROOM]: ApiResponseCreateRoom
  [ApiTrigger.ENTER_ROOM]: ApiResponseEnterRoom
  [ApiTrigger.LEAVE_ROOM]: ApiResponseLeaveRoom
  [ApiTrigger.START_GAME]: ApiResponseStartGame
}[T]
