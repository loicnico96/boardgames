import { RoomData, UserInfo } from "lib/model/RoomData"
import { fill, generate, randomValue, shuffle } from "lib/utils/arrays"
import { enumValues } from "lib/utils/enums"

import { GameType } from "../GameType"

import {
  BUILDING_COUNT,
  DistrictColor,
  DISTRICT_COUNT,
  MetropolysPlayer,
  MetropolysState,
  MissionShape,
  Token,
} from "./model/MetropolysState"

export function getInitialPlayerState(
  userInfo: UserInfo,
  color: DistrictColor,
  shape: MissionShape,
  isStartingPlayer: boolean
): MetropolysPlayer {
  return {
    ...userInfo,
    buildings: fill(BUILDING_COUNT, true),
    color,
    pass: false,
    ready: isStartingPlayer,
    shape,
    tokens: generate(enumValues(Token), token => [token, 0]),
  }
}

export async function getInitialGameState(
  room: RoomData<GameType.METROPOLYS>
): Promise<MetropolysState> {
  const { playerOrder, players } = room

  const colors = shuffle(enumValues(DistrictColor))
  const shapes = shuffle(enumValues(MissionShape))

  const startingPlayerId = randomValue(playerOrder)

  return {
    bids: [],
    currentPlayer: startingPlayerId,
    districts: fill(DISTRICT_COUNT, {}), // TODO Assign tokens
    lastRuins: null,
    mostMetro: null,
    playerOrder,
    players: generate(playerOrder, (playerId, index) => [
      playerId,
      getInitialPlayerState(
        players[playerId],
        colors[index],
        shapes[index],
        playerId === startingPlayerId
      ),
    ]),
    scores: [],
    turn: 0,
  }
}
