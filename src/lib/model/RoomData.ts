// @TODO Complete this type
export type GameType = string

export type UserId = string

export type UserInfo = {
  name: string
}

export type RoomId = string

// @TODO Complete this type
export type RoomOptions = unknown

export enum RoomStatus {
  FINISHED = "finished",
  ONGOING = "ongoing",
  OPENED = "opened",
}

export type RoomData = {
  createdAt: number
  game: GameType
  options: RoomOptions
  ownerId: UserId
  playerOrder: UserId[]
  players: Record<UserId, UserInfo>
  status: RoomStatus
}
