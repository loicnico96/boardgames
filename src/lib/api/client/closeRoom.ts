import { HttpClient } from "./HttpClient"

export async function closeRoom(roomId: string): Promise<void> {
  await HttpClient.delete(`/api/rooms/${roomId}`)
}
