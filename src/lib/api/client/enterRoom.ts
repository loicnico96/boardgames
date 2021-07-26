import { HttpClient } from "./HttpClient"

export async function enterRoom(roomId: string): Promise<void> {
  await HttpClient.post(`/api/rooms/${roomId}/enter`)
}
