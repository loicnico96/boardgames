import { BaseAction } from "@boardgames/common"
import { integer, objectUnion } from "@boardgames/utils"

import { MetropolysAction } from "./model/actions"
import { isValidBuilding } from "./model/buildings"
import { isAdjacent, isValidDistrict } from "./model/districts"
import { hasAvailableBuilding } from "./model/players"
import {
  getHighestBid,
  getPlayer,
  isAbleToPass,
  isDistrictBuildable,
  MetropolysState,
} from "./model/state"

export function validateAction(
  state: MetropolysState,
  playerId: string,
  action: BaseAction
): MetropolysAction {
  const validatedAction = objectUnion("code", {
    bid: {
      district: integer(),
      height: integer(),
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
  if (!isAbleToPass(state)) {
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
  const player = getPlayer(state, playerId)

  if (!isValidDistrict(district)) {
    throw Error("Invalid district")
  }

  if (!isValidBuilding(height)) {
    throw Error("Invalid building")
  }

  if (!hasAvailableBuilding(player, height)) {
    throw Error("Building is not available")
  }

  if (highestBid && highestBid.height >= height) {
    throw Error("Building is not high enough")
  }

  if (!isDistrictBuildable(state, district)) {
    throw Error("District is not available")
  }

  if (highestBid && !isAdjacent(district, highestBid.district)) {
    throw Error("District is not adjacent")
  }
}
