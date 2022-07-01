import { mod, Random } from "@boardgames/utils"
import update, { Spec } from "immutability-helper"

import { GameData, GameModel, RoomStatus } from "./model"

export type StateChangeHandler<M extends GameModel> = (
  state: M["state"],
  event: M["event"]
) => Promise<void>

export class GameContext<M extends GameModel> {
  private __data: GameData<M["state"]>
  private __generator: Random
  private __onStateChange: StateChangeHandler<M> | undefined

  public constructor(
    data: GameData<M["state"]>,
    onStateChange?: StateChangeHandler<M>
  ) {
    this.__data = data
    this.__generator = new Random(data.seed)
    this.__onStateChange = onStateChange
  }

  public get data(): GameData<M["state"]> {
    return this.__data
  }

  public get generator(): Random {
    return this.__generator
  }

  public get state(): M["state"] {
    return this.__data.state
  }

  public endGame(): void {
    this.update({ status: { $set: RoomStatus.FINISHED } } as Spec<M["state"]>)
  }

  public isEnded(): boolean {
    return this.state.status === RoomStatus.FINISHED
  }

  public isReady(): boolean {
    return this.state.playerOrder.every(id => this.player(id).ready)
  }

  public nextPlayer(playerId: string, shift: number = 1): string {
    const { playerOrder } = this.state
    const playerIndex = playerOrder.indexOf(playerId)
    return playerOrder[mod(playerIndex + shift, playerOrder.length)]
  }

  public nextPlayerWhich(
    playerId: string,
    condition: (player: M["player"], playerId: string) => boolean
  ): string | undefined {
    const { playerOrder, players } = this.state
    const playerIndex = playerOrder.indexOf(playerId)
    const playerCount = playerOrder.length
    for (let i = 0; i < playerCount; i++) {
      const nextPlayerId = playerOrder[mod(playerIndex + i + 1, playerCount)]
      if (condition(players[nextPlayerId], nextPlayerId)) {
        return nextPlayerId
      }
    }
    return undefined
  }

  public player(playerId: string): M["player"] {
    return this.state.players[playerId]
  }

  public clearAction(playerId: string): void {
    this.updatePlayer(playerId, {
      $merge: {
        action: null,
      },
    } as Spec<M["player"]>)
  }

  public requireAction(playerId: string): void {
    this.updatePlayer(playerId, {
      $merge: {
        action: null,
        ready: false,
      },
    } as Spec<M["player"]>)
  }

  public setAction(playerId: string, action: M["action"]): void {
    this.updatePlayer(playerId, {
      $merge: {
        action,
        ready: true,
      },
    } as Spec<M["player"]>)
  }

  public update(spec: Spec<M["state"]>): void {
    this.__data = update(this.__data, { state: spec })
  }

  public updatePlayer(playerId: string, spec: Spec<M["player"]>): void {
    this.update({ players: { [playerId]: spec } } as Spec<M["state"]>)
  }

  public async post(event: M["event"]): Promise<void> {
    if (this.__onStateChange) {
      await this.__onStateChange(this.state, event)
    }
  }
}
