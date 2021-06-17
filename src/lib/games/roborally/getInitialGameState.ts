import { RoomData } from "lib/model/RoomData"

import { GameType } from "../GameType"

import { RoborallyState } from "./model/RoborallyState"

export async function getInitialGameState(
  room: RoomData<GameType.ROBORALLY>
): Promise<RoborallyState> {
  return {}
}
