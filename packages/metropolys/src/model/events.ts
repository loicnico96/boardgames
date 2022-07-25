import { ObjectUnion } from "@boardgames/utils"

import { Token } from "./tokens"

export type MetropolysEvent = ObjectUnion<
  "code",
  {
    bid: {
      district: number
      height: number
      playerId: string
    }
    endGame: {
      playerId: string
    }
    getToken: {
      count: number
      playerId: string
      token: Token
    }
    lastRuins: {
      playerId: string
    }
    mostMetro: {
      count: number
      playerId: string
    }
    nextPlayer: {
      playerId: string
    }
    nextRound: {
      playerId: string
      round: number
    }
    pass: {
      playerId: string
    }
    winBid: {
      district: number
      height: number
      playerId: string
    }
  }
>
