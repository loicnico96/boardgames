import { int, object, oneOf } from "lib/utils/validation"

import { MetropolysAction } from "./model/MetropolysAction"
import {
  BUILDING_COUNT,
  DISTRICT_COUNT,
  getHighestBid,
  getPlayer,
  isDistrictAvailable,
  MetropolysState,
} from "./model/MetropolysState"

export function checkPlayerCanPass(gameState: MetropolysState) {
  const highestBid = getHighestBid(gameState)

  if (!highestBid) {
    throw Error("Cannot pass the first bid")
  }
}

export function checkPlayerCanBid(
  gameState: MetropolysState,
  playerId: string,
  district: number,
  height: number
) {
  const highestBid = getHighestBid(gameState)
  const player = getPlayer(gameState, playerId)

  if (!player.buildings[height]) {
    throw Error("Building is not available")
  }

  if (highestBid && highestBid.height >= height) {
    throw Error("Building is not high enough")
  }

  if (!isDistrictAvailable(gameState, district)) {
    throw Error("District is not available")
  }

  // TODO: Uncomment when district adjacency is added
  // if (highestBid && !isAdjacent(district, highestBid.district)) {
  //   throw Error("District is not adjacent")
  // }
}

export function validateAction(
  gameState: MetropolysState,
  playerId: string,
  action: unknown
): MetropolysAction {
  const typedAction = oneOf(
    object({
      district: int({
        min: 0,
        max: DISTRICT_COUNT - 1,
      }),
      height: int({
        min: 0,
        max: BUILDING_COUNT - 1,
      }),
      pass: false,
    }),
    object({
      pass: true,
    })
  )(action)

  if (typedAction.pass) {
    checkPlayerCanPass(gameState)
  } else {
    const { district, height } = typedAction
    checkPlayerCanBid(gameState, playerId, district, height)
  }

  return typedAction
}
