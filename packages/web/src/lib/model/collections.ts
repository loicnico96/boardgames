export enum Collection {
  GAMES = "games",
  GAMES_CLIENT = "client",
  GAMES_SERVER = "server",
  ROOMS = "rooms",
}

export function getRef(...segments: string[]): string {
  return segments.join("/")
}

export function getGameRef(game: string): string {
  return getRef(Collection.GAMES, game)
}

export function getClientRef(game: string, roomId: string): string {
  return getRef(Collection.GAMES, game, Collection.GAMES_CLIENT, roomId)
}

export function getServerRef(game: string, roomId: string): string {
  return getRef(Collection.GAMES, game, Collection.GAMES_SERVER, roomId)
}

export function getRoomRef(roomId: string): string {
  return getRef(Collection.ROOMS, roomId)
}
