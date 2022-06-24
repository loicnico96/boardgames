import { GameType } from "lib/games/types"

export enum RoomStatus {
  FINISHED = "finished",
  ONGOING = "ongoing",
  OPENED = "opened",
}

export type RoomData<T extends GameType = GameType> = {
  createdAt: number
  createdBy: string
  game: T
  options: RoomOptions
  playerOrder: string[]
  players: Record<string, PlayerInfo>
  status: RoomStatus
}

export type RoomOptions = Record<string, unknown> // TODO

export type PlayerInfo = {
  name: string
}
