import { mod, Random } from "@boardgames/utils"
import update, { Spec } from "immutability-helper"

import { BaseAction, BaseOptions, GameModel, UserInfo } from "./types"

export type StateChangeHandler<M extends GameModel> = (
  state: M["state"],
  event: M["event"]
) => Promise<void>

export abstract class BaseContext<M extends GameModel> {
  private __generator: Random | undefined
  private __onStateChange: StateChangeHandler<M> | undefined
  private __state: M["state"] | undefined

  public async initState(
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: M["options"],
    seed: number,
    fetcher: <T>(ref: string) => Promise<T>
  ) {
    this.__generator = new Random(seed)
    this.__state = await this.getInitialGameState(
      playerOrder,
      players,
      options,
      seed,
      fetcher
    )
  }

  public abstract getDefaultOptions(): M["options"]

  protected abstract getInitialGameState(
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: M["options"],
    seed: number,
    fetcher: <T>(ref: string) => Promise<T>
  ): Promise<M["state"]>

  protected abstract resolveState(): Promise<void>

  public abstract validateOptions(options: BaseOptions): M["options"]

  public abstract validateAction(
    playerId: string,
    action: BaseAction
  ): M["action"]

  public get generator(): Random {
    if (!this.__generator) {
      throw Error("Context was not initialized")
    }

    return this.__generator
  }

  public get state(): M["state"] {
    if (!this.__state) {
      throw Error("Context was not initialized")
    }

    return this.__state
  }

  public setState(state: M["state"]) {
    this.__generator = new Random(state.seed)
    this.__state = state
  }

  public isOver(): boolean {
    return this.state.over
  }

  public isWaitingForAction(): boolean {
    const { playerOrder } = this.state
    return playerOrder.some(playerId => !this.player(playerId).ready)
  }

  public player(playerId: string): M["player"] {
    const { players } = this.state
    return players[playerId]
  }

  public nextPlayerId(playerId: string, shift: number = 1): string {
    const { playerOrder } = this.state
    const playerIndex = playerOrder.indexOf(playerId)
    const nextPlayerIndex = mod(playerIndex + shift, playerOrder.length)
    return playerOrder[nextPlayerIndex]
  }

  public update(spec: Spec<M["state"]>): void {
    this.__state = update(this.state, spec)
  }

  public updatePlayer(playerId: string, spec: Spec<M["player"]>): void {
    this.update({
      players: {
        [playerId]: spec,
      },
    } as Spec<M["state"]>)
  }

  public updatePlayers(
    playerIds: string[],
    spec: (playerId: string) => Spec<M["player"]>
  ): void {
    this.update({
      players: playerIds.reduce((result, playerId) => {
        result[playerId] = spec(playerId)
        return result
      }, {} as Record<string, Spec<M["player"]>>),
    } as Spec<M["state"]>)
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

  public setSeed(seed: number): void {
    this.__generator = new Random(seed)
    this.update({
      $merge: {
        seed,
      },
    } as Spec<M["state"]>)
  }

  public onStateChange(onStateChange: StateChangeHandler<M>): void {
    this.__onStateChange = onStateChange
  }

  public async resolve(): Promise<M["state"]> {
    while (!this.isOver() && !this.isWaitingForAction()) {
      await this.resolveState()
    }

    return this.state
  }

  public async post(event: M["event"]): Promise<void> {
    if (this.__onStateChange) {
      await this.__onStateChange(this.state, event)
    }
  }

  public async endGame(event: M["event"]): Promise<void> {
    this.update({
      $merge: {
        over: true,
      },
    } as Spec<M["state"]>)

    return this.post(event)
  }
}
