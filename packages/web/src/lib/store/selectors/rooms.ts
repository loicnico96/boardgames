import { GameType } from "lib/games/types"
import {
  PlayerInfo,
  RoomData,
  RoomOptions,
  RoomStatus,
} from "lib/model/RoomData"

export function getGameType(room: RoomData): GameType {
  return room.game
}

export function getOwnerId(room: RoomData): string {
  return room.createdBy
}

export function getPlayerIds(room: RoomData): string[] {
  return room.playerOrder
}

export function getPlayers(room: RoomData): Record<string, PlayerInfo> {
  return room.players
}

export function getRoomOptions(room: RoomData): RoomOptions {
  return room.options
}

export function getRoomStatus(room: RoomData): RoomStatus {
  return room.status
}
