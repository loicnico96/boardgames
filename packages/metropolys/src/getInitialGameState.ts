import { RoomData, RoomStatus } from "@boardgames/common"
import { fill, generate, Random, remove } from "@boardgames/utils"

import {
  DistrictColor,
  DistrictSector,
  getDistricts,
  getDistrictSector,
  isTokenAssignable,
} from "./model/districts"
import { MissionShape } from "./model/missions"
import { MetropolysOptions } from "./model/options"
import { getInitialPlayerState } from "./model/players"
import { District, MetropolysState } from "./model/state"
import { Token } from "./model/tokens"

const TOKEN_COUNT_FOR_PLAYERS: Record<number, Record<Token, number>> = {
  2: {
    [Token.FANCY]: 5,
    [Token.METRO]: 6,
    [Token.RUINS]: 6,
  },
  3: {
    [Token.FANCY]: 8,
    [Token.METRO]: 7,
    [Token.RUINS]: 7,
  },
  4: {
    [Token.FANCY]: 9,
    [Token.METRO]: 9,
    [Token.RUINS]: 9,
  },
}

const TOKEN_COUNT_PER_SECTOR = 5
const TOKEN_COUNT_PER_SECTOR_CENTER = 7

export async function getInitialGameState(
  room: RoomData<string, MetropolysOptions>,
  generator: Random
): Promise<MetropolysState> {
  const startingPlayerId = generator.pick(room.playerOrder)

  const colors = generator.shuffle(Object.values(DistrictColor))
  const shapes = generator.shuffle(Object.values(MissionShape))

  const playerCount = room.playerOrder.length
  const sectors = generateAvailableSectors(playerCount, generator)
  const districts = generateDistricts(playerCount, sectors, generator)

  return {
    bids: [],
    currentPlayer: startingPlayerId,
    districts,
    lastRuins: null,
    mostMetro: null,
    playerOrder: room.playerOrder,
    players: generate(room.playerOrder, (playerId, playerIndex) => [
      playerId,
      getInitialPlayerState(
        room.players[playerId],
        colors[playerIndex],
        shapes[playerIndex]
      ),
    ]),
    round: 0,
    sectors,
    status: RoomStatus.ONGOING,
  }
}

function generateAvailableSectors(
  playerCount: number,
  generator: Random
): DistrictSector[] {
  const randomizedSectors = generator.shuffle(
    remove(Object.values(DistrictSector), DistrictSector.CENTER)
  )

  return [DistrictSector.CENTER, ...randomizedSectors.slice(0, playerCount)]
}

function generateDistricts(
  playerCount: number,
  sectors: DistrictSector[],
  generator: Random
): Record<number, District> {
  // List of available districts
  const districts = getDistricts().filter(district =>
    sectors.includes(getDistrictSector(district))
  )

  // Randomized list of tokens to assign
  const tokens = generator.shuffle(
    Object.values(Token).reduce<Token[]>((result, token) => {
      const tokenCount = TOKEN_COUNT_FOR_PLAYERS[playerCount][token]
      result.push(...fill(tokenCount, token))
      return result
    }, [])
  )

  // Randomized list of districts that are assigned tokens
  const districtsWithTokens = sectors.reduce<number[]>((result, sector) => {
    const sectorDistricts = districts.filter(
      district =>
        getDistrictSector(district) === sector && isTokenAssignable(district)
    )

    const tokenCount =
      sector === DistrictSector.CENTER
        ? TOKEN_COUNT_PER_SECTOR_CENTER
        : TOKEN_COUNT_PER_SECTOR

    result.push(...generator.shuffle(sectorDistricts).slice(0, tokenCount))
    return result
  }, [])

  // Map of districts to their assigned token
  const districtsTokens = districtsWithTokens.reduce<Record<number, Token>>(
    (result, district, index) => {
      result[district] = tokens[index]
      return result
    },
    {}
  )

  return generate(districts, district => [
    district,
    { token: districtsTokens[district] },
  ])
}
