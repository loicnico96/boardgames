import { isNumber, isObject } from "lib/utils/types"

import {
  getRequestedColor,
  isAbleToDiscard,
  isAbleToPlay,
  isValidCard,
} from "../cards"
import { PapayooAction, PapayooState } from "../model"

export function validatePlayerAction(
  state: PapayooState,
  playerId: string,
  action: unknown
): PapayooAction {
  if (!isObject(action)) {
    throw Error("Invalid action")
  }

  if (state.currentPlayerId !== playerId) {
    throw Error("Not your turn")
  }

  if (state.players[playerId].ready) {
    throw Error("Ready")
  }

  const { card } = action

  if (!isNumber(card) || !isValidCard(card)) {
    throw Error("Invalid action")
  }

  const player = state.players[playerId]

  if (!player.cards.includes(card)) {
    throw Error("Card is not in your hand")
  }

  const requestedColor = getRequestedColor(state.cards)

  if (!isAbleToPlay(card, requestedColor)) {
    if (!isAbleToDiscard(player, requestedColor)) {
      throw Error("Card is not playable")
    }
  }

  return { card }
}
