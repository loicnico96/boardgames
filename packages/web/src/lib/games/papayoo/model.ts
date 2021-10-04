import { GameModel, GameState } from "@boardgames/common"

export enum CardColor {
  BLACK = 0,
  SPADES = 1,
  HEARTS = 2,
  CLUBS = 3,
  DIAMONDS = 4,
}

export type Card = {
  color: CardColor
  value: number
}

export type PapayooAction = {
  card: number
}

export type PapayooEvent =
  | {
      code: "dealCards"
    }
  | {
      code: "nextPlayer"
      playerId: string
    }
  | {
      code: "nextRound"
      playerId: string
    }
  | {
      code: "playCard"
      card: number
      playerId: string
    }
  | {
      code: "score"
      cards: number[]
      playerId: string
      score: number
    }

export type PapayooOptions = {
  // Empty
}

export type PapayooPlayer = {
  cards: number[]
  name: string
  ready: boolean
  score: number
}

export type PapayooState = GameState & {
  cards: number[]
  currentPlayerId: string
  players: Record<string, PapayooPlayer>
  seed: number
  startingPlayerId: string
}

export type PapayooModel = GameModel & {
  action: PapayooAction
  event: PapayooEvent
  options: PapayooOptions
  state: PapayooState
}
