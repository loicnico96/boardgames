import { raise } from "@boardgames/utils"

import { CacaoState, ForestType, VillageType } from "../model"

export const PLAYER_HAND_SIZE = 3

export function repeat(times: number, fn: (index: number) => void): void {
  for (let i = 0; i < times; i++) {
    fn(i)
  }
}

export function inventory<T extends string | number>(
  itemsCount: Record<T, number>
): T[] {
  const result: T[] = []

  for (const item in itemsCount) {
    repeat(itemsCount[item], () => result.push(item))
  }

  return result
}

export function getForestDeck(playerCount: number): ForestType[] {
  return (
    {
      2: inventory({
        [ForestType.CACAO_1]: 3, // + 1 used in board setup
        [ForestType.CACAO_2]: 2,
        [ForestType.GOLD_1]: 1,
        [ForestType.GOLD_2]: 1,
        [ForestType.MARKET_2]: 1, // + 1 used in board setup
        [ForestType.MARKET_3]: 3,
        [ForestType.MARKET_4]: 1,
        [ForestType.SUN_DISK]: 1,
        [ForestType.TEMPLE]: 4,
        [ForestType.WATER]: 2,
      }),
      3: inventory({
        [ForestType.CACAO_1]: 5, // + 1 used in board setup
        [ForestType.CACAO_2]: 2,
        [ForestType.GOLD_1]: 2,
        [ForestType.GOLD_2]: 1,
        [ForestType.MARKET_2]: 1, // + 1 used in board setup
        [ForestType.MARKET_3]: 4,
        [ForestType.MARKET_4]: 1,
        [ForestType.SUN_DISK]: 2,
        [ForestType.TEMPLE]: 5,
        [ForestType.WATER]: 3,
      }),
      4: inventory({
        [ForestType.CACAO_1]: 5, // + 1 used in board setup
        [ForestType.CACAO_2]: 2,
        [ForestType.GOLD_1]: 2,
        [ForestType.GOLD_2]: 1,
        [ForestType.MARKET_2]: 1, // + 1 used in board setup
        [ForestType.MARKET_3]: 4,
        [ForestType.MARKET_4]: 1,
        [ForestType.SUN_DISK]: 2,
        [ForestType.TEMPLE]: 5,
        [ForestType.WATER]: 3,
      }),
    }[playerCount] ?? raise("Invalid player count")
  )
}

export function getVillageDeck(playerCount: number): VillageType[] {
  return (
    {
      2: inventory({
        [VillageType.VILLAGE_1111]: 4,
        [VillageType.VILLAGE_2101]: 5,
        [VillageType.VILLAGE_3001]: 1,
        [VillageType.VILLAGE_3100]: 1,
      }),
      3: inventory({
        [VillageType.VILLAGE_1111]: 3,
        [VillageType.VILLAGE_2101]: 5,
        [VillageType.VILLAGE_3001]: 1,
        [VillageType.VILLAGE_3100]: 1,
      }),
      4: inventory({
        [VillageType.VILLAGE_1111]: 3,
        [VillageType.VILLAGE_2101]: 4,
        [VillageType.VILLAGE_3001]: 1,
        [VillageType.VILLAGE_3100]: 1,
      }),
    }[playerCount] ?? raise("Invalid player count")
  )
}

export function getInitialBoard(): CacaoState["board"] {
  return {
    8: {
      8: {
        type: ForestType.CACAO_1,
      },
    },
    9: {
      9: {
        type: ForestType.MARKET_2,
      },
    },
  }
}
