import { GameType } from "lib/games/GameType"

const SEPARATOR = "/"

export enum Path {
  LOGIN = "login",
  ROOMS = "rooms",
}

export enum Param {
  GAME_TYPE = "game",
  ROOM_ID = "room",
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

export const isBrowser = typeof window !== "undefined"
export const isServer = typeof window === "undefined"
