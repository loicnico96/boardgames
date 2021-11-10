import {
  BaseAction,
  BaseContext,
  BaseOptions,
  UserInfo,
} from "@boardgames/common"
import {
  boolean,
  generate,
  object,
  optional,
  Position,
} from "@boardgames/utils"
import update from "immutability-helper"

import { validateAction } from "./action"
import { getInitialBoard } from "./board"
import { PLAYER_HAND_SIZE } from "./constants"
import { getForestDeck, getVillageDeck } from "./deck"
import {
  BoardTile,
  CacaoAction,
  CacaoModel,
  CacaoOptions,
  CacaoState,
} from "./model"
import { resolveState } from "./state/resolveState"

export class CacaoContext extends BaseContext<CacaoModel> {
  async getInitialGameState(
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: CacaoOptions,
    seed: number
  ): Promise<CacaoState> {
    const playerCount = playerOrder.length

    const startingPlayerId = this.generator.pick(playerOrder)

    const forestDeck = getForestDeck(playerCount, options)

    this.generator.shuffle(forestDeck)

    return {
      board: getInitialBoard(),
      currentPlayerId: null,
      deck: forestDeck,
      options,
      over: false,
      playerOrder,
      players: generate(playerOrder, playerId => {
        const playerDeck = getVillageDeck(playerCount, options)

        this.generator.shuffle(playerDeck)

        return [
          playerId,
          {
            ...players[playerId],
            action: null,
            beans: 0,
            chocolate: 0,
            coins: 0,
            deck: playerDeck.slice(PLAYER_HAND_SIZE),
            hand: playerDeck.slice(0, PLAYER_HAND_SIZE),
            ready: true,
            sun: 0,
            water: 0,
          },
        ]
      }),
      seed,
      startingPlayerId,
      tiles: [null, null],
    }
  }

  setTile(pos: Position, tile: BoardTile): void {
    this.update({
      board: {
        [pos.x]: row =>
          update(row ?? {}, {
            $merge: {
              [pos.y]: tile,
            },
          }),
      },
    })
  }

  async resolveState() {
    await resolveState(this)
  }

  getDefaultOptions(): CacaoOptions {
    return {}
  }

  validateOptions(options: BaseOptions): CacaoOptions {
    return object({
      useBigMarket: optional(boolean()),
      useBigTemple: optional(boolean()),
      useChocolate: optional(boolean()),
      useTree: optional(boolean()),
    })(options)
  }

  validateAction(playerId: string, action: BaseAction): CacaoAction {
    return validateAction(this.state, playerId, action)
  }
}
