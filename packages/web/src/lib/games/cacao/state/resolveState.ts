import {
  generate,
  mutableSortBy,
  dir,
  Direction,
  Directions,
  movePos,
  Pos,
  samePos,
  assert,
} from "@boardgames/utils"

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

import { PLAYER_HAND_SIZE } from "./getInitialGameState"
import { getForestFillPositions, isFillable } from "./validateAction"

export const MAX_BEANS = 5
export const MAX_SUN = 3
export const MAX_WATER = 8

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export async function gainBeans(
  context: CacaoContext,
  playerId: string,
  amount: number
): Promise<void> {
  const player = context.player(playerId)
  const gained = clamp(amount, 0, MAX_BEANS - player.beans)

  if (gained > 0) {
    context.updatePlayer(playerId, { beans: beans => beans + gained })
    await context.post("gainBeans", { playerId, amount: gained })
  }
}

export async function gainCoins(
  context: CacaoContext,
  playerId: string,
  amount: number
): Promise<void> {
  context.updatePlayer(playerId, { coins: coins => coins + amount })
  await context.post("gainCoins", { playerId, amount })
}

export async function gainSun(
  context: CacaoContext,
  playerId: string,
  amount: number
): Promise<void> {
  const player = context.player(playerId)
  const gained = clamp(amount, 0, MAX_SUN - player.sun)

  if (gained > 0) {
    context.updatePlayer(playerId, { sun: sun => sun + gained })
    await context.post("gainSun", { playerId, amount: gained })
  }
}

export async function gainWater(
  context: CacaoContext,
  playerId: string,
  amount: number
): Promise<void> {
  const player = context.player(playerId)
  const gained = clamp(amount, 0, MAX_WATER - player.water)

  if (gained > 0) {
    context.updatePlayer(playerId, { water: water => water + gained })
    await context.post("gainWater", { playerId, amount: gained })
  }
}

export async function loseSun(
  context: CacaoContext,
  playerId: string,
  amount: number
): Promise<void> {
  const player = context.player(playerId)
  const lost = clamp(amount, 0, player.sun)

  if (lost > 0) {
    context.updatePlayer(playerId, { sun: sun => sun - lost })
    await context.post("loseSun", { playerId, amount: lost })
  }
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

export async function sellBeans(
  context: CacaoContext,
  playerId: string,
  amount: number,
  price: number
): Promise<void> {
  const player = context.player(playerId)
  const sold = clamp(amount, 0, player.beans)

  if (sold > 0) {
    context.updatePlayer(playerId, {
      beans: beans => beans - sold,
      coins: coins => coins + sold * price,
    })

    await context.post("sellBeans", {
      playerId,
      amount,
      price,
    })
  }
}

export function getVillageWorkers(
  type: VillageType,
  direction: Direction
): number {
  return {
    [VillageType.VILLAGE_1111]: [1, 1, 1, 1],
    [VillageType.VILLAGE_2101]: [1, 2, 1, 0],
    [VillageType.VILLAGE_3001]: [1, 3, 0, 0],
    [VillageType.VILLAGE_3100]: [0, 3, 1, 0],
  }[type][direction]
}

export function getTileWorkers(
  village: VillageTile,
  direction: Direction
): number {
  return getVillageWorkers(village.type, dir(direction - village.rot))
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

  const willGainCacao = resolutions.some(resolution =>
    [ForestType.CACAO_1, ForestType.CACAO_2].includes(resolution.forest.type)
  )

  mutableSortBy(
    resolutions,
    resolution => {
      switch (resolution.forest.type) {
        case ForestType.CACAO_1:
        case ForestType.CACAO_2:
        case ForestType.MARKET_2:
        case ForestType.MARKET_3:
        case ForestType.MARKET_4:
          return 0
        case ForestType.GOLD_1:
        case ForestType.GOLD_2:
          return 1
        case ForestType.SUN_DISK:
          return 2
        case ForestType.WATER:
          return 3
        default:
          return 4
      }
    },
    resolution => {
      const workers = getTileWorkers(resolution.village, resolution.direction)
      switch (resolution.forest.type) {
        case ForestType.CACAO_1: {
          const amount = workers
          const gained = clamp(amount, 0, MAX_BEANS - player.beans)
          return amount - gained
        }
        case ForestType.CACAO_2: {
          const amount = workers * 2
          const gained = clamp(amount, 0, MAX_BEANS - player.beans)
          return amount - gained
        }
        case ForestType.MARKET_2: {
          const amount = workers
          const gained = clamp(amount, 0, player.beans)
          return (willGainCacao && amount > gained ? amount - gained : -1) * 2
        }
        case ForestType.MARKET_3: {
          const amount = workers
          const gained = clamp(amount, 0, player.beans)
          return (willGainCacao && amount > gained ? amount - gained : -1) * 3
        }
        case ForestType.MARKET_4: {
          const amount = workers
          const gained = clamp(amount, 0, player.beans)
          return (willGainCacao && amount > gained ? amount - gained : -1) * 4
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
  const workers = getTileWorkers(resolution.village, resolution.direction)

  console.log(resolution)

  await context.post("workers", {
    dir: resolution.direction,
    pos: resolution.villagePos,
    playerId,
    workers,
  })

  switch (resolution.forest.type) {
    case ForestType.CACAO_1:
      await gainBeans(context, playerId, workers)
      break

    case ForestType.CACAO_2:
      await gainBeans(context, playerId, workers * 2)
      break

    case ForestType.MARKET_2:
      await sellBeans(context, playerId, workers, 2)
      break

    case ForestType.MARKET_3:
      await sellBeans(context, playerId, workers, 3)
      break

    case ForestType.MARKET_4:
      await sellBeans(context, playerId, workers, 4)
      break

    case ForestType.GOLD_1:
      await gainCoins(context, playerId, workers)
      break

    case ForestType.GOLD_2:
      await gainCoins(context, playerId, workers * 2)
      break

    case ForestType.SUN_DISK:
      await gainSun(context, playerId, workers)
      break

    case ForestType.WATER:
      await gainWater(context, playerId, workers)
      break

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

  const village = context.tile(villagePos)
  assert(isVillageTile(village), "Not a Village tile")

  for (const direction of Directions) {
    if (getTileWorkers(village, direction) > 0) {
      const adjacentForestPos = movePos(villagePos, direction, 1)
      const adjacentForest = context.tile(adjacentForestPos)
      if (isForestTile(adjacentForest)) {
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
    const forest = context.tile(forestPos)
    assert(isForestTile(forest), "Not a Forest tile")

    for (const direction of Directions) {
      const adjacentVillagePos = movePos(forestPos, direction, 1)
      if (samePos(villagePos, adjacentVillagePos)) {
        continue
      }

      const adjacentVillage = context.tile(adjacentVillagePos)
      if (isVillageTile(adjacentVillage)) {
        if (getTileWorkers(adjacentVillage, direction + 2) > 0) {
          resolutions[adjacentVillage.playerId].push({
            direction: dir(direction + 2),
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
    isFillable(context.state, forestPos, 2),
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
    isFillable(context.state, forestPos, 2),
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

  const overbuilt = !context.isEmpty(villagePos)

  if (overbuilt) {
    assert(player.sun > 0, "You have no Sun Disks.")
    await loseSun(context, playerId, 1)
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

  const fillPositions = getForestFillPositions(
    context.state,
    action.village.pos,
    2
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
