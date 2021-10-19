import { BaseAction } from "@boardgames/common"

import { isNumber } from "lib/utils/types"

import {
  getRequestedColor,
  isAbleToDiscard,
  isAbleToPlay,
  isValidCard,
} from "../cards"
import { PapayooContext } from "../context"
import { PapayooAction } from "../model"

export function validateAction(
  context: PapayooContext,
  playerId: string,
  action: BaseAction
): PapayooAction {
  const { card } = action

  if (!isNumber(card) || !isValidCard(card)) {
    throw Error("Invalid action")
  }

  const player = context.state.players[playerId]

  if (!player.cards.includes(card)) {
    throw Error("Card is not in your hand")
  }

  const requestedColor = getRequestedColor(context.state.cards)

  if (!isAbleToPlay(card, requestedColor)) {
    if (!isAbleToDiscard(player, requestedColor)) {
      throw Error("Card is not playable")
    }
  }

  return { code: "playCard", card }
}
