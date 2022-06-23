import { isArray } from "@boardgames/utils"
import { ParsedUrlQuery } from "querystring"

import { GameType } from "lib/games/types"

export const SEPARATOR = "/"

export enum RouteParam {
  GAME = "game",
  REDIRECT = "redirect",
  ROOM = "room",
}

export enum RoutePath {
  LOGIN = "login",
  ROOMS = "rooms",
}

export type RouteParams = Partial<Record<RouteParam, string>>

export function route(...paths: string[]): string {
  const splitPaths = paths.flatMap(p => p.split(SEPARATOR)).filter(p => p)
  return `${SEPARATOR}${splitPaths.join(SEPARATOR)}`
}

export const ROUTES = {
  home: () => route(),
  login: () => route(RoutePath.LOGIN),
  room: (game: GameType, roomId: string) => route(game, roomId),
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
