import { BaseAction } from "@boardgames/common"
import { array, integer, objectUnion } from "@boardgames/utils"

import {
  getRequestedColor,
  getSwapCardCount,
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
  const { phase, playerOrder } = context.state

  const player = context.player(playerId)

  return objectUnion(
    "code",
    {
      playCard: {
        card: integer({
          custom: card => {
            if (!isValidCard(card)) {
              throw Error("Invalid card")
            }

            if (!player.cards.includes(card)) {
              throw Error("This card is not in your hand")
            }

            const requestedColor = getRequestedColor(context.state.cards)

            if (!isAbleToPlay(card, requestedColor)) {
              if (!isAbleToDiscard(player, requestedColor)) {
                throw Error("Card is not playable")
              }
            }
          },
        }),
      },
      swapCard: {
        cards: array(
          integer({
            custom: card => {
              if (!isValidCard(card)) {
                throw Error("Invalid card")
              }

              if (!player.cards.includes(card)) {
                throw Error("This card is not in your hand")
              }
            },
          }),
          {
            length: getSwapCardCount(playerOrder.length),
            unique: true,
          }
        ),
      },
    },
    {
      custom: ({ code }) => {
        if (code !== phase) {
          throw Error("You cannot perform this action now")
        }
      },
    }
  )(action)
}
