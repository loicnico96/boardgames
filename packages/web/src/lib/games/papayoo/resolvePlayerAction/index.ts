import { PapayooContext } from "../context"
import { PapayooAction } from "../model"

export async function resolvePlayerAction(
  context: PapayooContext,
  playerId: string,
  action: PapayooAction
) {
  context.update({
    cards: {
      $push: [action.card],
    },
    players: {
      [playerId]: {
        cards: cards => cards.filter(card => card !== action.card),
        ready: {
          $set: true,
        },
      },
    },
    seed: {
      $set: Math.random(),
    },
  })

  await context.post("playCard", {
    card: action.card,
    playerId,
  })
}
