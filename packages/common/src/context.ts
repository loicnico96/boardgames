import { assert, mod, Random } from "@boardgames/utils"
import update, { Spec } from "immutability-helper"

import { BaseAction, BaseOptions, BaseModel, RoomData } from "./model"

export type StateChangeHandler<M extends BaseModel> = (
  state: M["state"],
  event: M["event"]
) => Promise<void>

export abstract class BaseContext<M extends BaseModel> {
  private __generator: Random | undefined
  private __onStateChange: StateChangeHandler<M> | undefined
  private __state: M["state"] | undefined

  public get generator(): Random {
    const generator = this.__generator
    assert(!!generator, "Context was not initialized")
    return generator
  }

  public get state(): M["state"] {
    const state = this.__state
    assert(!!state, "Context was not initialized")
    return state
  }

  public player(playerId: string): M["player"] {
    const player = this.state.players[playerId]
    assert(!!player, "Not a player")
    return player
  }

  public nextPlayerId(playerId: string, shift: number = 1): string {
    const playerIds = this.state.playerOrder
    const playerIndex = playerIds.indexOf(playerId)
    assert(playerIndex >= 0, "Not a player")
    return playerIds[mod(playerIndex + shift, playerIds.length)]
  }

  public setState(state: M["state"]): void {
    this.__generator = new Random(state.seed)
    this.__state = state
  }

  public update(spec: Spec<M["state"]>): void {
    this.__state = update(this.state, spec)
  }

  public updatePlayer(playerId: string, spec: Spec<M["player"]>): void {
    this.update({ players: { [playerId]: spec } } as Spec<M["state"]>)
  }

  public requireAction(playerId: string): void {
    this.updatePlayer(playerId, { $merge: { ready: false } } as Spec<
      M["player"]
    >)
  }

  public setAction(playerId: string, action: M["action"]): void {
    this.updatePlayer(playerId, { $merge: { action, ready: true } } as Spec<
      M["player"]
    >)
  }

  public setSeed(seed: number): void {
    this.update({ $merge: { seed } } as Spec<M["state"]>)
  }

  public onStateChange(handler: StateChangeHandler<M>): void {
    this.__onStateChange = handler
  }

  public async post(event: M["event"]): Promise<void> {
    if (this.__onStateChange) {
      await this.__onStateChange(this.state, event)
    }
  }

  public endGame(): void {
    this.update({ $merge: { finished: true } } as Spec<M["state"]>)
  }

  public isOver(): boolean {
    return this.state.finished
  }

  public abstract getDefaultOptions(): M["options"]

  public abstract getInitialGameState(
    room: RoomData<string, M>,
    seed: number,
    fetcher: <T>(ref: string) => Promise<T>
  ): Promise<M["state"]>

  public abstract resolveState(): Promise<void>

  public abstract validateAction(
    playerId: string,
    action: BaseAction
  ): M["action"]

  public abstract validateOptions(options: BaseOptions): M["options"]
}
