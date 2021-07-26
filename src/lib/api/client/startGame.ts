import { HttpClient } from "./HttpClient"

export async function startGame(roomId: string): Promise<void> {
  await HttpClient.post(`/api/rooms/${roomId}/start`)
}
