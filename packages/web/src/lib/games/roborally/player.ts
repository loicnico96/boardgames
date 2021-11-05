import { clamp } from "@boardgames/utils"

import { MAX_HAND_SIZE, SEQUENCE_COUNT } from "./constants"
import { RoborallyPlayer } from "./model"

export function getHandSize(player: RoborallyPlayer): number {
  return MAX_HAND_SIZE - player.damage
}

export function getLockedProgramIndex(player: RoborallyPlayer): number {
  return clamp(getHandSize(player) - 1, 0, SEQUENCE_COUNT)
}

export function getLockedProgram(player: RoborallyPlayer): (number | null)[] {
  const lockIndex = getLockedProgramIndex(player)
  return player.program.map((card, index) => (index < lockIndex ? null : card))
}
