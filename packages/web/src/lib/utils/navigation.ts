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

export function route(...paths: string[]): string {
  return `${SEPARATOR}${paths.join(SEPARATOR)}`
}

export const ROUTES = {
  home: () => route(),
  login: () => route(RoutePath.LOGIN),
  roomList: () => route(RoutePath.ROOMS),
}
