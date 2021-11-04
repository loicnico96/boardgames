import {
  generate,
  mutableSortBy,
  getAdjacentPositions,
  getDir,
  Direction,
  Directions,
  movePos,
  Pos,
  samePos,
  assert,
} from "@boardgames/utils"

import { getTile, isEmpty, isFillable } from "../board"
import {
  CHOCOLATE_SCORE,
  MAX_PLAYER_BEANS,
  MAX_PLAYER_SUN_DISKS,
  MAX_WATER_LEVEL,
  PLAYER_HAND_SIZE,
  TREE_NO_WORKER_SCORE,
} from "../constants"
import { CacaoContext } from "../context"
import {
  CacaoAction,
  ForestTile,
  ForestType,
  isForestTile,
  isVillageTile,
  VillageTile,
  VillageType,
} from "../model"

export async function gainBeans(
  context: CacaoContext,
  playerId: string,
  pos: Pos,
  dir: Direction,
  amount: number
): Promise<number> {
  const player = context.player(playerId)
  const realAmount = Math.min(
    amount,
    MAX_PLAYER_BEANS - player.beans - player.chocolate
  )

  if (realAmount > 0) {
    context.updatePlayer(playerId, { beans: beans => beans + realAmount })
    await context.post("gainBeans", {
      amount: realAmount,
      dir,
      playerId,
      pos,
    })
  }

  return realAmount
}

export async function gainCoins(
  context: CacaoContext,
  playerId: string,
  pos: Pos,
  dir: Direction,
  amount: number
): Promise<number> {
  assert(amount > 0, "Invalid")

  context.updatePlayer(playerId, { coins: coins => coins + amount })
  await context.post("gainCoins", {
    amount,
    dir,
    playerId,
    pos,
  })

  return amount
}

export async function gainSun(
  context: CacaoContext,
  playerId: string,
  pos: Pos,
  dir: Direction,
  amount: number
): Promise<number> {
  const player = context.player(playerId)
  const realAmount = Math.min(amount, MAX_PLAYER_SUN_DISKS - player.sun)

  if (realAmount > 0) {
    context.updatePlayer(playerId, { sun: sun => sun + realAmount })
    await context.post("gainSun", {
      amount: realAmount,
      dir,
      playerId,
      pos,
    })
  }

  return realAmount
}

export async function gainWater(
  context: CacaoContext,
  playerId: string,
  pos: Pos,
  dir: Direction,
  amount: number
): Promise<number> {
  const player = context.player(playerId)
  const realAmount = Math.min(amount, MAX_WATER_LEVEL - player.water)

  if (realAmount > 0) {
    context.updatePlayer(playerId, { water: water => water + realAmount })
    await context.post("gainWater", {
      amount: realAmount,
      dir,
      playerId,
      pos,
    })
  }

  return realAmount
}

export async function spendSun(
  context: CacaoContext,
  playerId: string,
  amount: number
): Promise<number> {
  const player = context.player(playerId)
  const realAmount = Math.min(amount, player.sun)

  if (realAmount > 0) {
    context.updatePlayer(playerId, { sun: sun => sun - realAmount })
    await context.post("spendSun", { playerId, amount: realAmount })
  }

  return realAmount
}

export async function makeChocolate(
  context: CacaoContext,
  playerId: string,
  pos: Pos,
  dir: Direction,
  amount: number
): Promise<number> {
  const player = context.player(playerId)
  const realAmount = Math.min(amount, player.beans)

  if (realAmount > 0) {
    context.updatePlayer(playerId, {
      beans: beans => beans - realAmount,
      chocolate: chocolate => chocolate + realAmount,
    })

    await context.post("makeChocolate", {
      amount: realAmount,
      dir,
      playerId,
      pos,
    })
  }

  return realAmount
}

export async function sellBeans(
  context: CacaoContext,
  playerId: string,
  pos: Pos,
  dir: Direction,
  amount: number,
  price: number
): Promise<number> {
  const player = context.player(playerId)
  const realAmount = Math.min(amount, player.beans)

  if (realAmount > 0) {
    context.updatePlayer(playerId, {
      beans: beans => beans - realAmount,
      coins: coins => coins + realAmount * price,
    })

    await context.post("sellBeans", {
      amount: realAmount,
      dir,
      playerId,
      pos,
      price,
    })
  }

  return realAmount
}

export async function sellChocolate(
  context: CacaoContext,
  playerId: string,
  pos: Pos,
  dir: Direction,
  amount: number
): Promise<number> {
  const player = context.player(playerId)
  const realAmount = Math.min(amount, player.chocolate)
  const price = CHOCOLATE_SCORE

  if (realAmount > 0) {
    context.updatePlayer(playerId, {
      chocolate: chocolate => chocolate - realAmount,
      coins: coins => coins + realAmount * price,
    })

    await context.post("sellChocolate", {
      amount: realAmount,
      dir,
      playerId,
      pos,
      price,
    })
  }

  return realAmount
}

export async function nextPlayer(
  context: CacaoContext,
  playerId: string
): Promise<void> {
  if (context.player(playerId).hand.length === 0) {
    context.update({ $merge: { currentPlayerId: null } })
    context.endGame()
    return
  }

  context.update({ $merge: { currentPlayerId: playerId } })

  context.requireAction(playerId)

  await context.post("nextPlayer", { playerId })
}

export function getVillageWorkers(
  type: VillageType,
  direction: Direction
): number {
  return {
    [VillageType.VILLAGE_1111]: [1, 1, 1, 1],
    [VillageType.VILLAGE_2002]: [2, 0, 0, 2],
    [VillageType.VILLAGE_2020]: [2, 0, 2, 0],
    [VillageType.VILLAGE_2101]: [2, 1, 0, 1],
    [VillageType.VILLAGE_2200]: [2, 2, 0, 0],
    [VillageType.VILLAGE_3001]: [3, 0, 0, 1],
    [VillageType.VILLAGE_3010]: [3, 0, 1, 0],
    [VillageType.VILLAGE_3100]: [3, 1, 0, 0],
    [VillageType.VILLAGE_4000]: [4, 0, 0, 0],
  }[type][direction]
}

export function getTileWorkers(village: VillageTile, dir: Direction): number {
  return getVillageWorkers(village.type, getDir(dir - village.rot))
}

export type WorkerResolution = {
  direction: Direction
  forest: ForestTile
  forestPos: Pos
  village: VillageTile
  villagePos: Pos
}

export function sortResolutions(
  context: CacaoContext,
  playerId: string,
  resolutions: WorkerResolution[]
): void {
  const player = context.player(playerId)

  const willGainsBeans = resolutions.some(resolution =>
    [ForestType.CACAO_1, ForestType.CACAO_2].includes(resolution.forest.type)
  )

  const willGainChocolate =
    (player.beans > 0 || willGainsBeans) &&
    resolutions.some(resolution =>
      [ForestType.KITCHEN].includes(resolution.forest.type)
    )

  mutableSortBy(
    resolutions,
    resolution => {
      switch (resolution.forest.type) {
        case ForestType.GOLD_1:
        case ForestType.GOLD_2:
        case ForestType.TREE:
          return 1
        case ForestType.SUN_DISK:
          return 2
        case ForestType.WATER:
          return 3
        default:
          return 0
      }
    },
    resolution => {
      const workers = getTileWorkers(resolution.village, resolution.direction)
      switch (resolution.forest.type) {
        case ForestType.CACAO_1: {
          const amount = workers
          const gained = Math.min(
            amount,
            MAX_PLAYER_BEANS - player.beans - player.chocolate
          )
          return amount - gained
        }
        case ForestType.CACAO_2: {
          const amount = workers * 2
          const gained = Math.min(
            amount,
            MAX_PLAYER_BEANS - player.beans - player.chocolate
          )
          return amount - gained
        }
        case ForestType.KITCHEN: {
          return -3.5
        }
        case ForestType.MARKET_2: {
          const amount = workers
          const gained = Math.min(amount, player.beans)
          if (willGainsBeans && amount > gained) {
            return (amount - gained) * 2
          }

          return -2
        }
        case ForestType.MARKET_3: {
          const amount = workers
          const gained = Math.min(amount, player.beans)
          if (willGainsBeans && amount > gained) {
            return (amount - gained) * 3
          }

          return -3
        }
        case ForestType.MARKET_3_CHOCOLATE: {
          const chocolateAmount = workers
          const chocolateGained = Math.min(chocolateAmount, player.chocolate)
          if (willGainChocolate && chocolateAmount > chocolateGained) {
            return (chocolateAmount - chocolateGained) * 7
          }

          const beansAmount = chocolateAmount - chocolateGained
          const beansGained = Math.min(beansAmount, player.beans)
          if (willGainsBeans && beansAmount > beansGained) {
            return (beansAmount - beansGained) * 3
          }

          return chocolateGained > 0 ? -7 : -3
        }
        case ForestType.MARKET_4: {
          const amount = workers
          const gained = Math.min(amount, player.beans)
          if (willGainsBeans && amount > gained) {
            return (amount - gained) * 4
          }

          return -4
        }
        case ForestType.MARKET_5: {
          const amount = workers
          const gained = Math.min(amount, player.beans)
          if (willGainsBeans && amount > gained) {
            return (amount - gained) * 5
          }

          return -5
        }
        default:
          return -workers
      }
    },
    resolution => resolution.villagePos.x,
    resolution => resolution.villagePos.y,
    resolution => resolution.direction
  )
}

export async function resolveResolution(
  context: CacaoContext,
  playerId: string,
  resolution: WorkerResolution
): Promise<void> {
  const { direction, village, villagePos } = resolution

  const workers = getTileWorkers(village, direction)

  switch (resolution.forest.type) {
    case ForestType.CACAO_1: {
      await gainBeans(context, playerId, villagePos, direction, workers)
      break
    }

    case ForestType.CACAO_2: {
      await gainBeans(context, playerId, villagePos, direction, workers * 2)
      break
    }

    case ForestType.KITCHEN: {
      await makeChocolate(context, playerId, villagePos, direction, workers)
      break
    }

    case ForestType.MARKET_2: {
      await sellBeans(context, playerId, villagePos, direction, workers, 2)
      break
    }

    case ForestType.MARKET_3: {
      await sellBeans(context, playerId, villagePos, direction, workers, 3)
      break
    }

    case ForestType.MARKET_3_CHOCOLATE: {
      const usedWorkers = await sellChocolate(
        context,
        playerId,
        villagePos,
        direction,
        workers
      )
      await sellBeans(
        context,
        playerId,
        villagePos,
        direction,
        workers - usedWorkers,
        3
      )
      break
    }

    case ForestType.MARKET_4: {
      await sellBeans(context, playerId, villagePos, direction, workers, 4)
      break
    }

    case ForestType.MARKET_5: {
      await sellBeans(context, playerId, villagePos, direction, workers, 5)
      break
    }

    case ForestType.GOLD_1: {
      await gainCoins(context, playerId, villagePos, direction, workers)
      break
    }

    case ForestType.GOLD_2: {
      await gainCoins(context, playerId, villagePos, direction, workers * 2)
      break
    }

    case ForestType.SUN_DISK: {
      await gainSun(context, playerId, villagePos, direction, workers)
      break
    }

    case ForestType.TREE: {
      if (workers === 0) {
        await gainCoins(
          context,
          playerId,
          villagePos,
          direction,
          TREE_NO_WORKER_SCORE
        )
      } else {
        await gainCoins(context, playerId, villagePos, direction, workers)
      }
      break
    }

    case ForestType.WATER: {
      await gainWater(context, playerId, villagePos, direction, workers)
      break
    }

    default:
      break
  }
}

export async function resolveWorkers(
  context: CacaoContext,
  villagePos: Pos,
  forestPositions: Pos[]
): Promise<void> {
  const { currentPlayerId, playerOrder } = context.state
  assert(currentPlayerId !== null, "Invalid state")

  const resolutions = generate(playerOrder, playerId => [
    playerId,
    [] as WorkerResolution[],
  ])

  const village = getTile(context.state, villagePos)
  assert(isVillageTile(village), "Not a Village tile")

  for (const direction of Directions) {
    const adjacentForestPos = movePos(villagePos, direction, 1)
    const adjacentForest = getTile(context.state, adjacentForestPos)
    if (isForestTile(adjacentForest)) {
      if (
        getTileWorkers(village, direction) > 0 ||
        adjacentForest.type === ForestType.TREE
      ) {
        resolutions[village.playerId].push({
          direction,
          forest: adjacentForest,
          forestPos: adjacentForestPos,
          village,
          villagePos,
        })
      }
    }
  }

  for (const forestPos of forestPositions) {
    const forest = getTile(context.state, forestPos)
    assert(isForestTile(forest), "Not a Forest tile")

    for (const direction of Directions) {
      const adjacentVillagePos = movePos(forestPos, direction, 1)
      if (samePos(villagePos, adjacentVillagePos)) {
        continue
      }

      const adjacentVillage = getTile(context.state, adjacentVillagePos)
      if (isVillageTile(adjacentVillage)) {
        if (
          getTileWorkers(adjacentVillage, direction + 2) > 0 ||
          forest.type === ForestType.TREE
        ) {
          resolutions[adjacentVillage.playerId].push({
            direction: getDir(direction + 2),
            forest,
            forestPos,
            village: adjacentVillage,
            villagePos: adjacentVillagePos,
          })
        }
      }
    }
  }

  for (let index = 0; index < playerOrder.length; index++) {
    const playerId = context.nextPlayerId(currentPlayerId, index)
    const playerResolutions = resolutions[playerId]

    while (playerResolutions.length > 0) {
      sortResolutions(context, playerId, playerResolutions)
      const resolution = playerResolutions.shift()
      if (resolution !== undefined) {
        await resolveResolution(context, playerId, resolution)
      }
    }
  }
}

export async function fillForest(
  context: CacaoContext,
  forestPos: Pos,
  tileIndex: number
): Promise<void> {
  assert(
    isFillable(context.state, forestPos),
    "This location cannot be filled."
  )

  const type = context.state.tiles[tileIndex]
  assert(type !== null, "This tile is not available.")

  context.update({
    tiles: {
      [tileIndex]: {
        $set: null,
      },
    },
  })

  context.setTile(forestPos, { type })

  await context.post("placeForestTile", { pos: forestPos, type })
}

export async function fillForestFromDeck(
  context: CacaoContext,
  forestPos: Pos
): Promise<void> {
  assert(
    isFillable(context.state, forestPos),
    "This location cannot be filled."
  )
  assert(context.state.deck.length > 0, "The Forest deck is empty.")

  const type = context.state.deck[0]

  context.update({
    deck: {
      $splice: [[0, 1]],
    },
  })

  context.setTile(forestPos, { type })

  await context.post("placeForestTile", { pos: forestPos, type })
}

export async function placeVillageTile(
  context: CacaoContext,
  playerId: string,
  tileIndex: number,
  villagePos: Pos,
  rotation: number
): Promise<void> {
  const player = context.player(playerId)

  assert(tileIndex < player.hand.length, "This tile is not available.")

  const type = player.hand[tileIndex]

  const overbuilt = !isEmpty(context.state, villagePos)

  if (overbuilt) {
    assert(player.sun > 0, "You have no Sun Disks.")
    await spendSun(context, playerId, 1)
  }

  context.updatePlayer(playerId, {
    hand: {
      $splice: [[tileIndex, 1]],
    },
  })

  context.setTile(villagePos, {
    playerId,
    rot: rotation,
    type,
  })

  await context.post("placeVillageTile", {
    overbuilt,
    playerId,
    pos: villagePos,
    rot: rotation,
    type,
  })
}

export async function resolvePlayerAction(
  context: CacaoContext,
  playerId: string,
  action: CacaoAction
): Promise<void> {
  await placeVillageTile(
    context,
    playerId,
    action.village.index,
    action.village.pos,
    action.village.rot
  )

  const filledPositions: Pos[] = []

  for (const forest of action.forests) {
    await fillForest(context, forest.pos, forest.index)
    filledPositions.push(forest.pos)
  }

  const fillPositions = getAdjacentPositions(action.village.pos).filter(
    forestPos => isFillable(context.state, forestPos)
  )

  if (fillPositions.length > 0) {
    assert(
      context.state.tiles.every(tile => tile === null),
      "You must use all open Forest tiles before using the Forest deck."
    )

    for (const forestPos of fillPositions) {
      if (context.state.deck.length > 0) {
        await fillForestFromDeck(context, forestPos)
        filledPositions.push(forestPos)
      }
    }
  }

  await resolveWorkers(context, action.village.pos, filledPositions)
}

export async function refillPlayerHand(
  context: CacaoContext,
  playerId: string
) {
  const { deck, hand } = context.player(playerId)

  const refillCount = Math.min(PLAYER_HAND_SIZE - hand.length, deck.length)

  if (refillCount > 0) {
    context.updatePlayer(playerId, {
      deck: {
        $splice: [[0, refillCount]],
      },
      hand: {
        $push: deck.slice(0, refillCount),
      },
    })

    await context.post("drawTiles", {
      amount: refillCount,
      playerId,
    })
  }
}

export async function refillForestTiles(context: CacaoContext) {
  for (let index = 0; index < context.state.tiles.length; index++) {
    if (context.state.tiles[index] === null && context.state.deck.length > 0) {
      const type = context.state.deck[0]

      context.update({
        deck: {
          $splice: [[0, 1]],
        },
        tiles: {
          $splice: [[index, 1, type]],
        },
      })

      await context.post("refillForest", { index, type })
    }
  }
}

export async function resolveState(context: CacaoContext) {
  const { currentPlayerId, startingPlayerId } = context.state

  if (currentPlayerId !== null) {
    const { action } = context.player(currentPlayerId)
    assert(action !== null, "Invalid state")
    await resolvePlayerAction(context, currentPlayerId, action)
    await refillPlayerHand(context, currentPlayerId)
    await refillForestTiles(context)
    await nextPlayer(context, context.nextPlayerId(currentPlayerId))
  } else {
    await refillForestTiles(context)
    await nextPlayer(context, startingPlayerId)
  }
}
