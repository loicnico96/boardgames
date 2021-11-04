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

import { getDeck } from "./card"
import { MAX_HAND_SIZE, SEQUENCE_COUNT } from "./constants"
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
    // TODO: Initialize checkpoints
    const checkpoints = [
      {
        x: 3,
        y: 3,
      },
      {
        x: 7,
        y: 7,
      },
    ]

    return {
      // TODO: Initialize board
      board: {
        cells: {},
        dimensions: {
          x: 12,
          y: 12,
        },
      },
      boardId: options.boardId,
      checkpoints,
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
          dir: Direction.NORTH,
          hand: [],
          pos: checkpoints[0],
          powerDown: false,
          program: fill(SEQUENCE_COUNT, null),
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
        const deck = getDeck()

        this.generator.shuffle(deck)

        for (const playerId of this.state.playerOrder) {
          const player = this.player(playerId)
          assert(player.action?.code === "ready", "Invalid action")
          const handSize = MAX_HAND_SIZE - player.damage

          this.updatePlayer(playerId, {
            $merge: {
              hand: deck.splice(0, handSize),
            },
          })
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
          const player = this.player(playerId)
          assert(player.action?.code === "program", "Invalid action")
          this.updatePlayer(playerId, {
            $merge: {
              powerDown: player.action.powerDown,
            },
          })

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
        program: array(nullable(integer()), { length: SEQUENCE_COUNT }),
      },
      ready: {} as Record<string, never>,
    })(action)
  }
}
