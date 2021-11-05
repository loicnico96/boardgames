import { CacaoOptions, ForestType, VillageType } from "./model"

export function getDeck<T extends string>(items: Record<T, number>): T[] {
  const deck: T[] = []

  for (const item in items) {
    for (let i = 0; i < items[item]; i++) {
      deck.push(item)
    }
  }

  return deck
}

export function getForestDeck(
  playerCount: number,
  options: CacaoOptions
): ForestType[] {
  switch (playerCount) {
    case 2:
      return getDeck({
        [ForestType.CACAO_1]: 3, // + 1 used in board setup
        [ForestType.CACAO_2]: 2,
        [ForestType.GOLD_1]: options.useChocolate || options.useTree ? 0 : 1,
        [ForestType.GOLD_2]: options.useChocolate || options.useTree ? 0 : 1,
        [ForestType.KITCHEN]: options.useChocolate ? 2 : 0,
        [ForestType.MARKET_2]: 1, // + 1 used in board setup
        [ForestType.MARKET_3]:
          3 - (options.useChocolate ? 2 : 0) - (options.useBigMarket ? 1 : 0),
        [ForestType.MARKET_3_CHOCOLATE]: options.useChocolate ? 3 : 0,
        [ForestType.MARKET_3_CHOCOLATE]: options.useChocolate ? 2 : 0,
        [ForestType.MARKET_4]: 1,
        [ForestType.MARKET_5]: options.useBigMarket ? 1 : 0,
        [ForestType.SUN_DISK]: 1,
        [ForestType.TEMPLE_6]: 4 - (options.useBigTemple ? 1 : 0),
        [ForestType.TEMPLE_8]: options.useBigTemple ? 1 : 0,
        [ForestType.TREE]: options.useTree ? 2 : 0,
        [ForestType.WATER]: 2,
      })
    default:
      return getDeck({
        [ForestType.CACAO_1]: 5, // + 1 used in board setup
        [ForestType.CACAO_2]: 2,
        [ForestType.GOLD_1]: options.useChocolate || options.useTree ? 0 : 2,
        [ForestType.GOLD_2]: options.useChocolate || options.useTree ? 0 : 1,
        [ForestType.KITCHEN]: options.useChocolate ? 3 : 0,
        [ForestType.MARKET_2]: 1, // + 1 used in board setup
        [ForestType.MARKET_3]:
          4 - (options.useChocolate ? 3 : 0) - (options.useBigMarket ? 1 : 0),
        [ForestType.MARKET_3_CHOCOLATE]: options.useChocolate ? 3 : 0,
        [ForestType.MARKET_4]: 1,
        [ForestType.MARKET_5]: options.useBigMarket ? 1 : 0,
        [ForestType.SUN_DISK]: 2,
        [ForestType.TEMPLE_6]: 5 - (options.useBigTemple ? 1 : 0),
        [ForestType.TEMPLE_8]: options.useBigTemple ? 1 : 0,
        [ForestType.TREE]: options.useTree ? 3 : 0,
        [ForestType.WATER]: 3,
      })
  }
}

export function getVillageDeck(
  playerCount: number,
  options: CacaoOptions
): VillageType[] {
  switch (playerCount) {
    case 3:
      return getDeck({
        [VillageType.VILLAGE_1111]: 3,
        [VillageType.VILLAGE_2020]: options.useExtraWorkers ? 1 : 0,
        [VillageType.VILLAGE_2101]: options.useExtraWorkers ? 3 : 5,
        [VillageType.VILLAGE_3001]: 1,
        [VillageType.VILLAGE_3010]: options.useExtraWorkers ? 1 : 0,
        [VillageType.VILLAGE_3100]: 1,
        [VillageType.VILLAGE_4000]:
          options.useChocolate && options.useTree ? 1 : 0,
      })
    case 4:
      return getDeck({
        [VillageType.VILLAGE_1111]: 3,
        [VillageType.VILLAGE_2002]: options.useExtraWorkers ? 1 : 0,
        [VillageType.VILLAGE_2101]: options.useExtraWorkers ? 1 : 4,
        [VillageType.VILLAGE_2200]: options.useExtraWorkers ? 1 : 0,
        [VillageType.VILLAGE_3001]: 1,
        [VillageType.VILLAGE_3010]: options.useExtraWorkers ? 1 : 0,
        [VillageType.VILLAGE_3100]: 1,
        [VillageType.VILLAGE_4000]:
          options.useChocolate && options.useTree ? 1 : 0,
      })
    default:
      return getDeck({
        [VillageType.VILLAGE_1111]: 4,
        [VillageType.VILLAGE_2020]: options.useExtraWorkers ? 1 : 0,
        [VillageType.VILLAGE_2101]: options.useExtraWorkers ? 3 : 5,
        [VillageType.VILLAGE_3001]: 1,
        [VillageType.VILLAGE_3010]: options.useExtraWorkers ? 1 : 0,
        [VillageType.VILLAGE_3100]: 1,
        [VillageType.VILLAGE_4000]:
          options.useChocolate && options.useTree ? 1 : 0,
      })
  }
}
