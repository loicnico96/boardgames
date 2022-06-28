import { BaseModel } from "./games"
import { UserInfo } from "./users"

export enum RoomStatus {
  OPENED = 0,
  ONGOING = 1,
  FINISHED = 2,
}

export type RoomData<
  T extends string = string,
  M extends BaseModel = BaseModel
> = {
  createdAt: number
  createdBy: string
  game: T
  options: M["options"]
  playerOrder: string[]
  players: Record<string, UserInfo>
  status: RoomStatus
}
