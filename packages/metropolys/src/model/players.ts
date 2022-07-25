import { BasePlayer, UserInfo } from "@boardgames/common"
import { generate } from "@boardgames/utils"

import { MetropolysAction } from "./actions"
import { getInitialBuildings } from "./buildings"
import { DistrictColor } from "./districts"
import { MissionShape } from "./missions"
import { Token } from "./tokens"

export interface MetropolysPlayer extends BasePlayer<MetropolysAction> {
  buildings: Partial<Record<number, boolean>>
  color: DistrictColor
  name: string
  pass: boolean
  ready: boolean
  shape: MissionShape
  tokens: Record<Token, number>
}

export function getAvailableBuildings(
  player: MetropolysPlayer,
  minHeight: number = 0
): number[] {
  return Object.keys(player.buildings)
    .map(Number)
    .filter(height => height >= minHeight && !!player.buildings[height])
}

export function getInitialPlayerState(
  userInfo: UserInfo,
  color: DistrictColor,
  shape: MissionShape
): MetropolysPlayer {
  return {
    action: null,
    buildings: getInitialBuildings(),
    color,
    name: userInfo.name,
    pass: false,
    ready: true,
    shape,
    tokens: generate(Object.values(Token), token => [token, 0]),
  }
}

export function getTokenCount(player: MetropolysPlayer, token: Token): number {
  return player.tokens[token]
}

export function hasAvailableBuilding(
  player: MetropolysPlayer,
  height: number
): boolean {
  return !!player.buildings[height]
}

export function hasAvailableBuildings(
  player: MetropolysPlayer,
  minHeight: number = 0
): boolean {
  return getAvailableBuildings(player, minHeight).length > 0
}

export function hasPassed(player: MetropolysPlayer): boolean {
  return player.pass
}
