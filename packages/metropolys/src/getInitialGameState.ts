import { RoomData, RoomStatus } from "@boardgames/common"
import { fill, generate, Random, remove } from "@boardgames/utils"

import { MetropolysOptions } from "./model/options"
import { MetropolysState } from "./model/state"
import {
  BUILDING_COUNT,
  DistrictColor,
  DistrictSector,
  DISTRICT_COUNT,
  Mission,
  Token,
} from "./model/types"
import { getDistrictSector, isDeadEnd } from "./utils/board"

const TOKEN_COUNT: Record<number, Record<Token, number>> = {
  2: {
    [Token.FANCY]: 9,
    [Token.METRO]: 9,
    [Token.RUINS]: 9,
  },
  3: {
    [Token.FANCY]: 8,
    [Token.METRO]: 7,
    [Token.RUINS]: 7,
  },
  4: {
    [Token.FANCY]: 5,
    [Token.METRO]: 6,
    [Token.RUINS]: 6,
  },
}

export async function getInitialGameState(
  room: RoomData<string, MetropolysOptions>,
  generator: Random
): Promise<MetropolysState> {
  const startingPlayerId = generator.pick(room.playerOrder)

  const colors = generator.shuffle(Object.values(DistrictColor))
  const shapes = generator.shuffle(Object.values(Mission))

  const playerCount = room.playerOrder.length
  const sectors = getSectorsForPlayerCount(playerCount, generator)

  const districts = fill(DISTRICT_COUNT, district => district).filter(
    district => sectors.includes(getDistrictSector(district))
  )

  const tokens = generator.shuffle(
    Object.values(Token).reduce<Token[]>((result, token) => {
      const tokenCount = TOKEN_COUNT[playerCount][token]
      result.push(...fill(tokenCount, token))
      return result
    }, [])
  )

  const districtsWithTokens = sectors.reduce<number[]>((result, sector) => {
    const sectorDistricts = districts.filter(
      district => getDistrictSector(district) === sector && !isDeadEnd(district)
    )

    const tokenCount = sector === DistrictSector.CENTER ? 7 : 5
    result.push(...generator.shuffle(sectorDistricts).slice(0, tokenCount))
    return result
  }, [])

  const districtsTokens = districtsWithTokens.reduce<Record<number, Token>>(
    (result, district, index) => {
      result[district] = tokens[index]
      return result
    },
    {}
  )

  return {
    bids: [],
    currentPlayer: startingPlayerId,
    districts: generate(districts, district => [
      district,
      { token: districtsTokens[district] },
    ]),
    lastRuins: null,
    mostMetro: null,
    playerOrder: room.playerOrder,
    players: generate(room.playerOrder, (playerId, playerIndex) => [
      playerId,
      {
        ...room.players[playerId],
        action: null,
        buildings: fill(BUILDING_COUNT, true),
        color: colors[playerIndex],
        pass: false,
        ready: true,
        shape: shapes[playerIndex],
        tokens: generate(Object.values(Token), token => [token, 0]),
      },
    ]),
    round: 0,
    sectors,
    status: RoomStatus.ONGOING,
  }
}

function getSectorsForPlayerCount(
  playerCount: number,
  generator: Random
): DistrictSector[] {
  const sectors = generator.shuffle(Object.values(DistrictSector))

  return [
    // Always includes central district...
    DistrictSector.CENTER,
    // ... then picks one additional district for each player.
    ...remove(sectors, DistrictSector.CENTER).slice(0, playerCount),
  ]
}
