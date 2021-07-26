import { HttpClient } from "./HttpClient"

export async function leaveRoom(roomId: string): Promise<void> {
  await HttpClient.post(`/api/rooms/${roomId}/leave`)
}
