export enum GameType {
  METROPOLYS = "metropolys",
  ROBORALLY = "roborally",
}

export type UserId = string

export type UserInfo = {
  name: string
}

export type RoomId = string

// @TODO Complete this type
export type RoomOptions = Record<string, unknown>

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
