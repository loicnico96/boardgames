import { RoomData } from "lib/model/RoomData"

import { GameType } from "../GameType"

import { MetropolysState } from "./model/MetropolysState"

export async function getInitialGameState(
  room: RoomData<GameType.METROPOLYS>
): Promise<MetropolysState> {
  return {}
}
