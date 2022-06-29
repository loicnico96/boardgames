import { BaseAction } from "@boardgames/common"
import { integer, objectUnion } from "@boardgames/utils"

import { MetropolysAction } from "./model/action"
import {
  BUILDING_COUNT,
  DISTRICT_COUNT,
  getHighestBid,
  isDistrictAvailable,
  MetropolysState,
} from "./model/state"

export function validateAction(
  state: MetropolysState,
  playerId: string,
  action: BaseAction
): MetropolysAction {
  const validatedAction = objectUnion("code", {
    bid: {
      district: integer({
        min: 0,
        max: DISTRICT_COUNT - 1,
      }),
      height: integer({
        min: 0,
        max: BUILDING_COUNT - 1,
      }),
    },
    pass: {},
  })(action)

  if (validatedAction.code === "bid") {
    const { district, height } = validatedAction
    checkPlayerCanBid(state, playerId, district, height)
  } else {
    checkPlayerCanPass(state)
  }

  return validatedAction
}

export function checkPlayerCanPass(state: MetropolysState) {
  const highestBid = getHighestBid(state)

  if (!highestBid) {
    throw Error("Cannot pass the first bid")
  }
}

export function checkPlayerCanBid(
  state: MetropolysState,
  playerId: string,
  district: number,
  height: number
) {
  const highestBid = getHighestBid(state)
  const player = state.players[playerId]

  if (!player.buildings[height]) {
    throw Error("Building is not available")
  }

  if (highestBid && highestBid.height >= height) {
    throw Error("Building is not high enough")
  }

  if (!isDistrictAvailable(state, district)) {
    throw Error("District is not available")
  }

  // TODO: Uncomment when district adjacency is added
  // if (highestBid && !isAdjacent(district, highestBid.district)) {
  //   throw Error("District is not adjacent")
  // }
}
