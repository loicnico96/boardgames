import { GameType } from "lib/games/types"

export enum RoomStatus {
  FINISHED = "finished",
  ONGOING = "ongoing",
  OPENED = "opened",
}

export type RoomData<T extends GameType = GameType> = {
  createdAt: number
  game: T
  options: Record<string, unknown> // TODO
  ownerId: string
  playerOrder: string[]
  players: Record<string, unknown> // TODO
  status: RoomStatus
}
