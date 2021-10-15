import {
  BaseModel,
  BaseOptions,
  BasePlayer,
  BaseState,
} from "@boardgames/common"

import { ObjectUnion } from "lib/utils/types"

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

export type PapayooAction = ObjectUnion<
  "code",
  {
    playCard: {
      card: number
    }
  }
>

export type PapayooEvent = ObjectUnion<
  "code",
  {
    dealCards: {}
    nextPlayer: {
      playerId: string
    }
    nextRound: {
      playerId: string
    }
    playCard: {
      card: number
      playerId: string
    }
    score: {
      cards: number[]
      playerId: string
      score: number
    }
  }
>

export type PapayooOptions = BaseOptions

export type PapayooPlayer = BasePlayer<PapayooAction> & {
  cards: number[]
  score: number
}

export type PapayooState = BaseState<PapayooPlayer> & {
  cards: number[]
  currentPlayerId: string
  seed: number
  startingPlayerId: string
}

export type PapayooModel = BaseModel & {
  event: PapayooEvent
  options: PapayooOptions
  state: PapayooState
}
