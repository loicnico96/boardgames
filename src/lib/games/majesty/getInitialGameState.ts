import { RoomData } from "lib/model/RoomData"

import { GameType } from "../GameType"

import { MajestyState } from "./model/MajestyState"

export async function getInitialGameState(
  room: RoomData<GameType.MAJESTY>
): Promise<MajestyState> {
  return {}
}
