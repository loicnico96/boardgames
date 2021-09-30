import { GameOptions, GameType } from "lib/games/types"

import { UserInfo } from "./UserInfo"

export enum RoomStatus {
  FINISHED = "finished",
  ONGOING = "ongoing",
  OPENED = "opened",
}

export type RoomData<T extends GameType = GameType> = {
  createdAt: number
  game: T
  options: GameOptions<T>
  ownerId: string
  playerOrder: string[]
  players: Record<string, UserInfo>
  status: RoomStatus
}
