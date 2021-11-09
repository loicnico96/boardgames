import { BasePlayer, BaseState, GameModel } from "@boardgames/common"
import { Direction, ObjectUnion, Pos, Rotation } from "@boardgames/utils"

export enum BoardId {
  DEFAULT = "default",
}

export enum CellType {
  NORMAL = 0,
  HOLE = 1,
  GEAR = 2,
  CONVEYOR = 3,
  CONVEYOR_FAST = 4,
  REPAIR = 5,
  TELEPORT = 6,
  PORTAL = 7,
}

export enum WallType {
  NONE = 0,
  NORMAL = 1,
}

export type Cell = ObjectUnion<
  "type",
  {
    [CellType.NORMAL]: {}
    [CellType.HOLE]: {}
    [CellType.GEAR]: {
      rot: Rotation
    }
    [CellType.CONVEYOR]: {
      dir: Direction
    }
    [CellType.CONVEYOR_FAST]: {
      dir: Direction
    }
    [CellType.REPAIR]: {}
    [CellType.TELEPORT]: {}
    [CellType.PORTAL]: {
      pos: Pos
    }
  }
> & {
  walls?: Partial<Record<Direction, WallType>>
  water?: boolean
}

export enum GamePhase {
  READY = 0,
  PROGRAM = 1,
  RESOLVE_PROGRAM = 2,
  RESOLVE_CONVEYOR_FAST = 3,
  RESOLVE_CONVEYOR = 4,
  RESOLVE_GEAR = 5,
  RESOLVE_PUSHER = 6,
  RESOLVE_CRUSHER = 7,
  RESOLVE_LASER = 8,
  RESOLVE_REPAIR = 9,
  RESOLVE_CHECKPOINT = 10,
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
          pos: Pos
        }
      }
    }
    playerTeleport: {
      players: {
        [playerId in string]: {
          pos: Pos
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
  pos: Pos
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
  }
  boardId: BoardId
  checkpoints: Pos[]
  currentPlayerId: string | null
  phase: GamePhase
  sequence: number | null
  turn: number
}

export type RoborallyModel = GameModel<
  RoborallyAction,
  RoborallyEvent,
  RoborallyOptions,
  RoborallyPlayer,
  RoborallyState
>
