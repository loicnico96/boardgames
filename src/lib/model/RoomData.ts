import { GameType } from "lib/games/GameType"

export type UserInfo = {
  name: string
}

// @TODO Complete this type
export type RoomOptions = Record<string, unknown>

export enum RoomStatus {
  FINISHED = "finished",
  ONGOING = "ongoing",
  OPENED = "opened",
}

export type RoomData<T extends GameType = GameType> = {
  createdAt: number
  game: T
  options: RoomOptions
  ownerId: string
  playerOrder: string[]
  players: Record<string, UserInfo>
  status: RoomStatus
}
