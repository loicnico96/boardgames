import { BaseOptions } from "./games"
import { UserInfo } from "./users"

export enum RoomStatus {
  OPEN = "open",
  ONGOING = "ongoing",
  FINISHED = "finished",
}

export type RoomData<
  T extends string = string,
  O extends BaseOptions = BaseOptions
> = {
  createdAt: number
  createdBy: string
  game: T
  options: O
  playerOrder: string[]
  players: Record<string, UserInfo>
  status: RoomStatus
}
