import { isArray } from "@boardgames/utils"
import { ParsedUrlQuery } from "querystring"

export const SEPARATOR = "/"

export enum RouteParam {
  GAME_TYPE = "game",
  REDIRECT = "redirect",
  ROOM_ID = "room",
}

export enum RoutePath {
  LOGIN = "login",
  ROOMS = "rooms",
}

export type RouteParams = Partial<Record<RouteParam, string>>

export function route(...paths: string[]): string {
  return `${SEPARATOR}${paths.join(SEPARATOR)}`
}

export const ROUTES = {
  home: () => route(),
  login: () => route(RoutePath.LOGIN),
  roomList: () => route(RoutePath.ROOMS),
}

export function getParam(
  query: ParsedUrlQuery,
  param: RouteParam
): string | null {
  const value = query[param]
  return isArray(value) ? value[0] ?? null : value ?? null
}

export function withSearchParams(path: string, params: RouteParams): string {
  const search = new URLSearchParams(params).toString()
  return search ? `${path}?${search}` : path
}
