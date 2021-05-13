const SEPARATOR = "/"

const PATH_LOGIN = "login"
const PATH_ROOMS = "rooms"

export function route(...paths: string[]): string {
  return `${SEPARATOR}${paths.join(SEPARATOR)}`
}

export const ROUTES = {
  home: () => route(),
  login: () => route(PATH_LOGIN),
  room: (roomId: string) => route(PATH_ROOMS, roomId),
  roomList: () => route(PATH_ROOMS),
}

export function isSSR(): boolean {
  return typeof window === "undefined"
}
