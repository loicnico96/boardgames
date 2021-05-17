import { NextApiRequest } from "next"

export enum HttpHeader {
  ALLOW = "Allow",
  AUTHORIZATION = "Authorization",
  CONTENT_TYPE = "Content-Type",
  ORIGIN = "Origin",
}

export enum HttpMethod {
  DELETE = "DELETE",
  GET = "GET",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
}

export enum HttpStatus {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_AUTHENTICATED = 401,
  NOT_AUTHORIZED = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL = 500,
}

export enum ApiTrigger {
  ROOM_CREATE = "/api/rooms/createRoom",
}

export type ApiRequest<T extends ApiTrigger> = {
  [ApiTrigger.ROOM_CREATE]: Record<string, unknown>
}[T]

export type ApiResponse<T extends ApiTrigger> = {
  [ApiTrigger.ROOM_CREATE]: { success: boolean }
}[T]

export type ApiHandler<T = unknown> = (req: NextApiRequest) => Promise<T>
