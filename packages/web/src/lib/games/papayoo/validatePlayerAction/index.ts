import { isNumber, isObject } from "lib/utils/types"

import { getRequestedColor, isCardPlayable, isValidCard } from "../cards"
import { PapayooAction, PapayooState } from "../model"

export function validatePlayerAction(
  state: PapayooState,
  playerId: string,
  action: unknown
): PapayooAction {
  if (!isObject(action)) {
    throw Error("Invalid action")
  }

  const { card } = action

  if (!isNumber(card) || !isValidCard(card)) {
    throw Error("Invalid action")
  }

  const player = state.players[playerId]

  if (!player.cards.includes(card)) {
    throw Error("Card is not in your hand")
  }

  if (!isCardPlayable(card, player.cards, getRequestedColor(state.cards))) {
    throw Error("Card is not playable")
  }

  return { card }
}
