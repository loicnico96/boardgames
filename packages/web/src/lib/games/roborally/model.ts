import { BasePlayer, BaseState, GameModel } from "@boardgames/common"
import { Direction, ObjectUnion, Position, Rotation } from "@boardgames/utils"

export enum BoardId {
  // TODO
  DEFAULT = "default",
}

export enum BoardFeature {
  CONVEYOR = "conveyor",
  CONVEYOR_FAST = "conveyorFast",
  CRUSHER = "crusher",
  GEAR = "gear",
  LASER = "laser",
  PORTAL = "portal",
  PUSHER = "pusher",
  REPAIR = "repair",
  TELEPORT = "teleport",
  TRAP = "trap",
  WATER = "water",
}

export type Cell = {
  conveyor?: {
    dir: Direction
    fast?: boolean
  }
  crush?: {
    active: number[]
  }
  gear?: {
    rot: Rotation
  }
  hole?:
    | boolean
    | {
        active: number[]
      }
  portal?: {
    pos: Position
  }
  push?: {
    active: number[]
    dir: Direction
  }
  repair?: boolean
  teleport?: boolean
  walls?: Direction[]
  water?: boolean
}

export enum GamePhase {
  READY = 0,
  PROGRAM = 1,
  RESOLVE_TRAP = 2,
  RESOLVE_PROGRAM = 3,
  RESOLVE_CONVEYOR_FAST = 4,
  RESOLVE_CONVEYOR = 5,
  RESOLVE_PUSHER = 6,
  RESOLVE_CRUSHER = 7,
  RESOLVE_GEAR = 8,
  RESOLVE_LASER = 9,
  RESOLVE_REPAIR = 10,
  RESOLVE_CHECKPOINT = 11,
}

export type RoborallyAction = ObjectUnion<
  "code",
  {
    program: {
      powerDown: boolean
      program: (number | null)[]
    }
    ready: {}
  }
>

export type RoborallyEvent = ObjectUnion<
  "code",
  {
    nextPhase: {
      phase: GamePhase
    }
    playerCard: {
      card: number
      playerId: string
    }
    playerCheckpoint: {
      players: {
        [playerId in string]: {
          checkpoint: number
        }
      }
    }
    playerDamage: {
      players: {
        [playerId in string]: {
          damage: number
        }
      }
    }
    playerDestroy: {
      players: {
        [playerId in string]: {
          destroyed: boolean
        }
      }
    }
    playerMove: {
      players: {
        [playerId in string]: {
          dir?: Direction
          rot?: number
        }
      }
    }
    playerRepair: {
      players: {
        [playerId in string]: {
          repair: number
        }
      }
    }
    playerRespawn: {
      players: {
        [playerId in string]: {
          dir: Direction
          pos: Position
        }
      }
    }
    playerTeleport: {
      players: {
        [playerId in string]: {
          pos: Position
        }
      }
    }
    win: {
      playerId: string
    }
  }
>

export type RoborallyOptions = {
  boardId: BoardId
  checkpoints: number
}

export type RoborallyPlayer = BasePlayer<RoborallyAction> & {
  checkpoint: number
  checkpointDir: Direction
  damage: number
  destroyed: boolean
  hand: number[]
  pos: Position
  rot: number
  powerDown: boolean
  powerDownNext: boolean
  program: (number | null)[]
  virtual: boolean
}

export type RoborallyState = BaseState<RoborallyPlayer> & {
  board: {
    cells: Partial<Record<number, Partial<Record<number, Cell>>>>
    dimensions: {
      x: number
      y: number
    }
    features: BoardFeature[]
  }
  boardId: BoardId
  checkpoints: Position[]
  currentPlayerId: string | null
  phase: GamePhase
  sequence: number
  turn: number
}

export type RoborallyModel = GameModel<
  RoborallyAction,
  RoborallyEvent,
  RoborallyOptions,
  RoborallyPlayer,
  RoborallyState
>
