export enum CardAction {
  MOVE_1 = "move_1",
  MOVE_2 = "move_2",
  MOVE_3 = "move_3",
  MOVE_BACK = "move_back",
  ROTATE_BACK = "rotate_back",
  ROTATE_LEFT = "rotate_left",
  ROTATE_RIGHT = "rotate_right",
}

const ACTION_COUNTS = [
  {
    actions: [CardAction.ROTATE_BACK],
    count: 6,
  },
  {
    actions: [CardAction.ROTATE_LEFT, CardAction.ROTATE_BACK],
    count: 18,
  },
  {
    actions: [CardAction.MOVE_BACK],
    count: 6,
  },
  {
    actions: [CardAction.MOVE_1],
    count: 18,
  },
  {
    actions: [CardAction.MOVE_2],
    count: 12,
  },
  {
    actions: [CardAction.MOVE_3],
    count: 6,
  },
]

const CARD_ACTIONS = ACTION_COUNTS.reduce((result, { actions, count }) => {
  for (let i = 0; i < count; i++) {
    result.push(...actions)
  }

  return result
}, [] as CardAction[])

export function isValidCard(card: number): boolean {
  return Number.isInteger(card) && card >= 0 && card < CARD_ACTIONS.length
}

export function getCardAction(card: number): CardAction {
  return CARD_ACTIONS[card]
}

export function getCardPriority(card: number): number {
  return (card + 1) * 10
}

export function getDeck(): number[] {
  return CARD_ACTIONS.map((_, card) => card)
}
