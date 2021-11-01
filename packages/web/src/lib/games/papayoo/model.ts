import {
  BaseOptions,
  BasePlayer,
  BaseState,
  GameModel,
} from "@boardgames/common"
import { ObjectUnion } from "@boardgames/utils"

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
    swapCard: {
      cards: number[]
    }
  }
>

export type PapayooEvent = ObjectUnion<
  "code",
  {
    nextGame: {}
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
    swapCard: {}
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
  phase: PapayooAction["code"] | "nextGame"
  seed: number
  startingPlayerId: string
}

export type PapayooModel = GameModel<
  PapayooAction,
  PapayooEvent,
  PapayooOptions,
  PapayooPlayer,
  PapayooState
>
