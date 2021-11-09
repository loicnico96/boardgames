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

import { isValidCard } from "./card"
import { SEQUENCE_COUNT } from "./constants"
import {
  BoardId,
  GamePhase,
  RoborallyAction,
  RoborallyModel,
  RoborallyOptions,
  RoborallyState,
} from "./model"
import { resolveTurn } from "./resolve/resolveTurn"
import { startTurn } from "./resolve/startTurn"

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
        x: 2,
        y: 9,
      },
      {
        x: 9,
        y: 6,
      },
      {
        x: 5,
        y: 4,
      },
      {
        x: 9,
        y: 2,
      },
      {
        x: 1,
        y: 5,
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
        features: [],
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
          powerDownNext: false,
          program: fill(SEQUENCE_COUNT, null),
          ready: false,
          rot: 0,
          virtual: true,
        },
      ]),
      seed,
      sequence: 0,
      turn: 0,
    }
  }

  async resolveState() {
    switch (this.state.phase) {
      case GamePhase.READY:
        return startTurn(this)
      case GamePhase.PROGRAM:
        return resolveTurn(this)
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
