import { BaseOptions, RoomStatus, UserInfo } from "@boardgames/common"

import { GameType, RoomData } from "lib/games/types"

export function getGameType(room: RoomData): GameType {
  return room.game
}

export function getOwnerId(room: RoomData): string {
  return room.createdBy
}

export function getPlayerIds(room: RoomData): string[] {
  return room.playerOrder
}

export function getPlayers(room: RoomData): Record<string, UserInfo> {
  return room.players
}

export function getRoomOptions(room: RoomData): BaseOptions {
  return room.options
}

export function getRoomStatus(room: RoomData): RoomStatus {
  return room.status
}
