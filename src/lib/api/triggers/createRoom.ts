export type ApiRequestCreateRoom = {
  game: string
}

export type ApiResponseCreateRoom = {
  roomId: string
}

export function createRoom(
  game: string,
  userId: string
): Promise<ApiResponseCreateRoom> {
  return Promise.resolve({ roomId: `${game}:${userId}` })
}
