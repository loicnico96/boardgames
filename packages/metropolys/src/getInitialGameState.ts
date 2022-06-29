import { RoomData, RoomStatus } from "@boardgames/common"
import { fill, generate, Random } from "@boardgames/utils"

import { MetropolysOptions } from "./model/options"
import {
  BUILDING_COUNT,
  DistrictColor,
  DISTRICT_COUNT,
  MetropolysState,
  MissionShape,
  Token,
} from "./model/state"

export async function getInitialGameState(
  room: RoomData<string, MetropolysOptions>,
  generator: Random
): Promise<MetropolysState> {
  const startingPlayerId = generator.pick(room.playerOrder)
  const colors = Object.values(DistrictColor)
  const shapes = Object.values(MissionShape)

  generator.shuffle(colors)
  generator.shuffle(shapes)

  return {
    bids: [],
    currentPlayer: startingPlayerId,
    districts: fill(DISTRICT_COUNT, {}),
    lastRuins: null,
    mostMetro: null,
    playerOrder: room.playerOrder,
    players: generate(room.playerOrder, playerId => [
      playerId,
      {
        ...room.players[playerId],
        action: null,
        buildings: fill(BUILDING_COUNT, true),
        color: colors[room.playerOrder.indexOf(playerId)],
        pass: false,
        ready: startingPlayerId !== playerId,
        shape: shapes[room.playerOrder.indexOf(playerId)],
        tokens: generate(Object.values(Token), token => [token, 0]),
      },
    ]),
    status: RoomStatus.ONGOING,
    turn: 0,
  }
}
