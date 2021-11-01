import {
  BaseAction,
  BaseContext,
  BaseOptions,
  UserInfo,
} from "@boardgames/common"
import { generate, object, Pos } from "@boardgames/utils"
import update from "immutability-helper"

import {
  BoardTile,
  CacaoAction,
  CacaoModel,
  CacaoOptions,
  CacaoPlayer,
  CacaoState,
} from "./model"
import {
  getForestDeck,
  getInitialBoard,
  getVillageDeck,
  PLAYER_HAND_SIZE,
} from "./state/getInitialGameState"
import { resolveState } from "./state/resolveState"
import { validateAction } from "./state/validateAction"

export class CacaoContext extends BaseContext<CacaoModel> {
  getInitialPlayerState(userInfo: UserInfo, playerCount: number): CacaoPlayer {
    const deck = getVillageDeck(playerCount)

    this.generator.shuffle(deck)

    return {
      ...userInfo,
      action: null,
      beans: 0,
      coins: 0,
      deck: deck.slice(PLAYER_HAND_SIZE),
      hand: deck.slice(0, PLAYER_HAND_SIZE),
      ready: true,
      sun: 0,
      water: 0,
    }
  }

  getInitialGameState(
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: CacaoOptions,
    seed: number
  ): CacaoState {
    const playerCount = playerOrder.length

    const startingPlayerId = this.generator.pick(playerOrder)

    const deck = getForestDeck(playerCount)

    this.generator.shuffle(deck)

    return {
      board: getInitialBoard(),
      currentPlayerId: null,
      deck,
      over: false,
      playerOrder,
      players: generate(playerOrder, playerId => [
        playerId,
        this.getInitialPlayerState(players[playerId], playerCount),
      ]),
      seed,
      startingPlayerId,
      tiles: [null, null],
    }
  }

  tile(pos: Pos): BoardTile {
    return this.state.board[pos.x]?.[pos.y] ?? { type: null }
  }

  isEmpty(pos: Pos): boolean {
    return this.tile(pos).type === null
  }

  setTile(pos: Pos, tile: BoardTile): void {
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
    return object({})(options)
  }

  validateAction(playerId: string, action: BaseAction): CacaoAction {
    return validateAction(this, playerId, action)
  }
}
