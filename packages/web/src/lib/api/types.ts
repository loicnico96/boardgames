export const AUTH_TOKEN_PREFIX = "Bearer "

export enum ContentType {
  JSON = "application/json",
}

export type GenericHttpResponse = {
  success: boolean
}

export enum HttpHeader {
  ALLOW = "Allow",
  AUTHORIZATION = "Authorization",
  CONTENT_TYPE = "Content-Type",
  ORIGIN = "Origin",
}

export enum HttpMethod {
  DELETE = "DELETE",
  GET = "GET",
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
  FAILED_PRECONDITION = 412,
  INTERNAL_ERROR = 500,
}
