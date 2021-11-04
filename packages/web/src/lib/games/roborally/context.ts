import {
  BaseAction,
  BaseContext,
  BaseOptions,
  UserInfo,
} from "@boardgames/common"
import {
  array,
  assert,
  boolean,
  Direction,
  enumValue,
  fill,
  generate,
  integer,
  nullable,
  object,
  objectUnion,
} from "@boardgames/utils"

import {
  BoardId,
  GamePhase,
  RoborallyAction,
  RoborallyModel,
  RoborallyOptions,
  RoborallyState,
} from "./model"

export class RoborallyContext extends BaseContext<RoborallyModel> {
  getInitialGameState(
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: RoborallyOptions,
    seed: number
  ): RoborallyState {
    return {
      // TODO: Initialize board
      board: {
        cells: {},
        dimensions: {
          x: 0,
          y: 0,
        },
      },
      boardId: options.boardId,
      // TODO: Initialize checkpoints
      checkpoints: [],
      currentPlayerId: null,
      over: false,
      phase: GamePhase.READY,
      playerOrder,
      players: generate(playerOrder, playerId => [
        playerId,
        {
          ...players[playerId],
          action: null,
          active: true,
          checkpoint: 0,
          damage: 0,
          // TODO: Initialize direction
          dir: Direction.NORTH,
          hand: [],
          // TODO: Initialize position
          pos: {
            x: 0,
            y: 0,
          },
          powerDown: false,
          program: fill(5, null),
          ready: false,
          virtual: true,
        },
      ]),
      seed,
      sequence: null,
      turn: 0,
    }
  }

  async resolveState() {
    switch (this.state.phase) {
      case GamePhase.READY: {
        for (const playerId of this.state.playerOrder) {
          const player = this.player(playerId)
          assert(player.action?.code === "ready", "Invalid action")
          // TODO: Deal cards
        }

        this.update({
          $merge: {
            phase: GamePhase.PROGRAM,
          },
        })

        for (const playerId of this.state.playerOrder) {
          this.requireAction(playerId)
        }

        return
      }

      case GamePhase.PROGRAM: {
        for (const playerId of this.state.playerOrder) {
          const player = this.player(playerId)
          assert(player.action?.code === "program", "Invalid action")
          this.updatePlayer(playerId, {
            $merge: {
              hand: [],
              powerDown: player.action.powerDown,
              program: player.action.program,
            },
          })
        }

        // TODO: Resolve programs

        this.update({
          $merge: {
            phase: GamePhase.READY,
          },
        })

        for (const playerId of this.state.playerOrder) {
          this.requireAction(playerId)
        }

        return
      }

      default:
        throw Error("Invalid status")
    }
  }

  getDefaultOptions(): RoborallyOptions {
    return {
      boardId: BoardId.DEFAULT,
      checkpoints: 1,
    }
  }

  validateOptions(options: BaseOptions): RoborallyOptions {
    return object({
      boardId: enumValue(BoardId),
      checkpoints: integer({ min: 1 }),
    })(options)
  }

  validateAction(playerId: string, action: BaseAction): RoborallyAction {
    return objectUnion("code", {
      program: {
        powerDown: boolean(),
        program: array(nullable(integer({ min: 0 })), { length: 5 }),
      },
      ready: {} as Record<string, never>,
    })(action)
  }
}
