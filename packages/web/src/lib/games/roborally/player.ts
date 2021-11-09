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

export function isAlive(player: RoborallyPlayer): boolean {
  return !player.destroyed
}

export function isPoweredDown(player: RoborallyPlayer): boolean {
  return player.powerDown
}

export function isReady(player: RoborallyPlayer): boolean {
  return player.ready
}

export function isVirtual(player: RoborallyPlayer): boolean {
  return player.virtual
}

export function isAbleToFire(player: RoborallyPlayer): boolean {
  return isAlive(player) && !isPoweredDown(player) && !isVirtual(player)
}

export function isAbleToMove(player: RoborallyPlayer): boolean {
  return isAlive(player) && !isPoweredDown(player)
}

export function isAffectedByPlayers(player: RoborallyPlayer): boolean {
  return isAlive(player) && !isVirtual(player)
}

export function isAffectedByBoard(player: RoborallyPlayer): boolean {
  return isAlive(player)
}

export function isAffectedByLasers(player: RoborallyPlayer): boolean {
  return isAlive(player) && !isVirtual(player)
}
