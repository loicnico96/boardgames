import {
  BaseOptions,
  BasePlayer,
  BaseState,
  GameModel,
} from "@boardgames/common"
import { Direction, Pos, isEnum, ObjectUnion } from "@boardgames/utils"

export enum ForestType {
  CACAO_1 = "beans1", // x6
  CACAO_2 = "beans2", // x2
  GOLD_1 = "gold1", // x2
  GOLD_2 = "gold2", // x1
  MARKET_2 = "market2", // x2
  MARKET_3 = "market3", // x4
  MARKET_4 = "market4", // x1
  SUN_DISK = "sun", // x2
  TEMPLE = "temple", // x5
  WATER = "water", // x3
}

export enum VillageType {
  VILLAGE_1111 = "1-1-1-1", // x4
  VILLAGE_2101 = "2-1-0-1", // x5
  VILLAGE_3001 = "3-0-0-1", // x1
  VILLAGE_3100 = "3-1-0-0", // x1
}

export type VillageTile = {
  playerId: string
  rot: number
  type: VillageType
}

export type ForestTile = {
  type: ForestType
}

export type BoardTile = { type: null } | ForestTile | VillageTile

export function isForestTile(tile: BoardTile): tile is ForestTile {
  return isEnum(tile.type, ForestType)
}

export function isVillageTile(tile: BoardTile): tile is VillageTile {
  return isEnum(tile.type, VillageType)
}

export type CacaoAction = ObjectUnion<
  "code",
  {
    playTile: {
      forests: {
        index: number
        pos: Pos
      }[]
      village: {
        index: number
        pos: Pos
        rot: number
      }
    }
  }
>

export type CacaoEvent = ObjectUnion<
  "code",
  {
    gainBeans: {
      amount: number
      playerId: string
    }
    gainCoins: {
      amount: number
      playerId: string
    }
    gainSun: {
      amount: number
      playerId: string
    }
    gainWater: {
      amount: number
      playerId: string
    }
    loseSun: {
      amount: number
      playerId: string
    }
    nextPlayer: {
      playerId: string
    }
    placeForestTile: {
      pos: Pos
      type: ForestType
    }
    placeVillageTile: {
      overbuilt: boolean
      playerId: string
      pos: Pos
      rot: number
      type: VillageType
    }
    refillForest: {
      index: number
      type: ForestType
    }
    sellBeans: {
      amount: number
      playerId: string
      price: number
    }
    workers: {
      pos: Pos
      dir: Direction
      playerId: string
      workers: number
    }
  }
>

export type CacaoOptions = BaseOptions

export type CacaoPlayer = BasePlayer<CacaoAction> & {
  beans: number
  coins: number
  deck: VillageType[]
  hand: VillageType[]
  sun: number
  water: number
}

export type CacaoState = BaseState<CacaoPlayer> & {
  board: Partial<Record<number, Partial<Record<number, BoardTile>>>>
  currentPlayerId: string | null
  deck: ForestType[]
  startingPlayerId: string
  tiles: [ForestType | null, ForestType | null]
}

export type CacaoModel = GameModel<
  CacaoAction,
  CacaoEvent,
  CacaoOptions,
  CacaoPlayer,
  CacaoState
>
