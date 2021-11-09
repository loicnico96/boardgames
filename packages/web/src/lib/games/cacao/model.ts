import { BasePlayer, BaseState, GameModel } from "@boardgames/common"
import { Direction, Position, ObjectUnion, isEnum } from "@boardgames/utils"

export enum ForestType {
  CACAO_1 = "beans1",
  CACAO_2 = "beans2",
  GOLD_1 = "gold1",
  GOLD_2 = "gold2",
  KITCHEN = "kitchen",
  MARKET_2 = "market2",
  MARKET_3 = "market3",
  MARKET_3_CHOCOLATE = "market3_chocolate",
  MARKET_4 = "market4",
  MARKET_5 = "market5",
  SUN_DISK = "sun",
  TEMPLE_6 = "temple6",
  TEMPLE_8 = "temple8",
  TREE = "tree",
  WATER = "water",
}

export enum VillageType {
  VILLAGE_1111 = "1-1-1-1",
  VILLAGE_2002 = "2-0-0-2",
  VILLAGE_2020 = "2-0-2-0",
  VILLAGE_2101 = "2-1-0-1",
  VILLAGE_2200 = "2-2-0-0",
  VILLAGE_3001 = "3-0-0-1",
  VILLAGE_3010 = "3-0-1-0",
  VILLAGE_3100 = "3-1-0-0",
  VILLAGE_4000 = "4-0-0-0",
}

export type EmptyTile = {
  type: null
}

export type VillageTile = {
  playerId: string
  rot: number
  type: VillageType
}

export type ForestTile = {
  type: ForestType
}

export type BoardTile = EmptyTile | ForestTile | VillageTile

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
        pos: Position
      }[]
      village: {
        index: number
        pos: Position
        rot: number
      }
    }
  }
>

export type CacaoEvent = ObjectUnion<
  "code",
  {
    drawTiles: {
      amount: number
      playerId: string
    }
    gainBeans: {
      amount: number
      dir: Direction
      playerId: string
      pos: Position
    }
    gainCoins: {
      amount: number
      dir: Direction
      playerId: string
      pos: Position
    }
    gainSun: {
      amount: number
      dir: Direction
      playerId: string
      pos: Position
    }
    gainWater: {
      amount: number
      dir: Direction
      playerId: string
      pos: Position
    }
    makeChocolate: {
      amount: number
      dir: Direction
      playerId: string
      pos: Position
    }
    nextPlayer: {
      playerId: string
    }
    placeForestTile: {
      pos: Position
      type: ForestType
    }
    placeVillageTile: {
      overbuilt: boolean
      playerId: string
      pos: Position
      rot: number
      type: VillageType
    }
    refillForest: {
      index: number
      type: ForestType
    }
    sellBeans: {
      amount: number
      dir: Direction
      playerId: string
      pos: Position
      price: number
    }
    sellChocolate: {
      amount: number
      dir: Direction
      playerId: string
      pos: Position
      price: number
    }
    spendSun: {
      amount: number
      playerId: string
    }
    win: {}
  }
>

export type CacaoOptions = {
  useBigMarket?: boolean
  useBigTemple?: boolean
  useChocolate?: boolean
  useTree?: boolean
  useExtraWorkers?: boolean
}

export type CacaoPlayer = BasePlayer<CacaoAction> & {
  beans: number
  chocolate: number
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
  options: CacaoOptions
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
