import { GameType } from "lib/model/RoomData"

const SEPARATOR = "/"

export enum Collection {
  GAMES = "games",
  GAMES_CLIENT = "client",
  GAMES_SERVER = "server",
  ROOMS = "rooms",
}

export function getRef(...segments: string[]): string {
  return segments.join(SEPARATOR)
}

export function getRoomRef(roomId: string): string {
  return getRef(Collection.ROOMS, roomId)
}

export function getClientRef(game: GameType, roomId: string): string {
  return getRef(Collection.GAMES, game, Collection.GAMES_CLIENT, roomId)
}

export function getServerRef(game: GameType, roomId: string): string {
  return getRef(Collection.GAMES, game, Collection.GAMES_SERVER, roomId)
}
