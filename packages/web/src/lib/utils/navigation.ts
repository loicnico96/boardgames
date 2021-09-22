import { GameType } from "lib/games"

export const SEPARATOR = "/"

export enum Param {
  GAME_TYPE = "game",
  REDIRECT = "redirect",
  ROOM_ID = "room",
}

export enum Path {
  LOGIN = "login",
  ROOMS = "rooms",
}

export function route(...paths: string[]): string {
  return `${SEPARATOR}${paths.join(SEPARATOR)}`
}

export const ROUTES = {
  home: () => route(),
  login: () => route(Path.LOGIN),
  room: (game: GameType, roomId: string) => route(game, roomId),
  roomList: () => route(Path.ROOMS),
}
