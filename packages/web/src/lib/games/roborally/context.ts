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
  count,
  enumValue,
  fill,
  generate,
  integer,
  nullable,
  object,
  objectUnion,
} from "@boardgames/utils"

import { getDeck, isValidCard } from "./card"
import { MAX_HAND_SIZE, SEQUENCE_COUNT } from "./constants"
import {
  BoardId,
  GamePhase,
  RoborallyAction,
  RoborallyModel,
  RoborallyOptions,
  RoborallyState,
} from "./model"
import { nextPhase } from "./resolve/nextPhase"
import { resolveSequence } from "./resolve/resolveSequence"

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
          checkpoint: 0,
          checkpointDir: 0,
          damage: 0,
          destroyed: false,
          hand: [],
          pos: checkpoints[0],
          powerDown: false,
          program: fill(SEQUENCE_COUNT, null),
          ready: false,
          rot: 0,
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

          this.requireAction(playerId)
        }

        return nextPhase(this, GamePhase.PROGRAM)
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

        for (let sequence = 0; sequence < SEQUENCE_COUNT; sequence++) {
          await resolveSequence(this, sequence)

          if (this.isOver()) {
            return
          }
        }

        this.update({
          $merge: {
            sequence: null,
          },
          turn: turn => turn + 1,
        })

        for (const playerId of this.state.playerOrder) {
          const player = this.player(playerId)
          assert(player.action?.code === "program", "Invalid action")
          this.updatePlayer(playerId, {
            $merge: {
              // TODO: Respawn destroyed players
              // TODO: Remove all damage if powered down
              powerDown: player.action.powerDown,
              // TODO: Lock registers based on damage
              program: [null, null, null, null, null],
            },
          })

          this.requireAction(playerId)
        }

        return nextPhase(this, GamePhase.READY)
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
    const player = this.player(playerId)

    const validated = objectUnion("code", {
      program: {
        powerDown: boolean(),
        program: array(nullable(integer())),
      },
      ready: {} as Record<string, never>,
    })(action)

    if (validated.code === "program") {
      assert(this.state.phase === GamePhase.PROGRAM, "Not available")
      assert(validated.program.length === 5, "Program must contain 5 cards")

      for (let index = 0; index < SEQUENCE_COUNT; index++) {
        const card = validated.program[index]

        if (player.powerDown) {
          assert(card === null, "Cannot program cards while powered down")
        } else if (player.program[index] !== null) {
          assert(card === player.program[index], "Register is locked")
        } else {
          assert(card !== null, "Register is empty")
          assert(isValidCard(card), "Invalid card")
          assert(player.hand.includes(card), "Card is not in your hand")
          assert(count(validated.program, card) === 1, "Duplicate card")
        }
      }
    } else {
      assert(this.state.phase === GamePhase.READY, "Not available")
    }

    return validated
  }
}
