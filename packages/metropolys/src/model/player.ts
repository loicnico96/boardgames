import { BasePlayer } from "@boardgames/common"

import { MetropolysAction } from "./action"
import { Bid, DistrictColor, Mission, Token } from "./types"

export interface MetropolysPlayer extends BasePlayer<MetropolysAction> {
  buildings: boolean[]
  color: DistrictColor
  name: string
  pass: boolean
  ready: boolean
  shape: Mission
  tokens: Record<Token, number>
}

export function getTokenCount(player: MetropolysPlayer, token: Token): number {
  return player.tokens[token]
}

export function hasAnyAvailableBuilding(player: MetropolysPlayer): boolean {
  return player.buildings.some(available => available)
}

export function isAbleToBid(
  player: MetropolysPlayer,
  highestBid: Bid
): boolean {
  return (
    !player.pass &&
    player.buildings.some(
      (available, height) => available && height > highestBid.height
    )
  )
}
