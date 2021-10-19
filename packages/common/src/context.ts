import update, { Spec } from "immutability-helper"

import { BaseAction, BaseOptions, GameModel, UserInfo } from "./types"
import { mod } from "./utils"

export type StateChangeHandler<M extends GameModel> = (
  state: M["state"],
  event: M["event"]
) => Promise<void>

export abstract class BaseContext<M extends GameModel> {
  private __onStateChange: StateChangeHandler<M> | null = null
  private __state: M["state"]

  public constructor(state: M["state"])
  public constructor(
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: M["options"]
  )
  public constructor(
    ...args:
      | [state: M["state"]]
      | [
          playerOrder: string[],
          players: Record<string, UserInfo>,
          options: M["options"]
        ]
  ) {
    if (args.length === 1) {
      this.__state = args[0]
    } else {
      this.__state = this.getInitialState(...args)
    }
  }

  protected abstract getInitialState(
    playerOrder: string[],
    players: Record<string, UserInfo>,
    options: M["options"]
  ): M["state"]

  protected abstract resolveState(): Promise<void>

  public abstract validateAction(
    playerId: string,
    action: BaseAction
  ): M["action"]

  public abstract validateOptions(options: BaseOptions): M["options"]

  public get state(): M["state"] {
    return this.__state
  }

  public isOver(): boolean {
    return this.__state.over
  }

  public isWaitingForAction(): boolean {
    const { playerOrder, players } = this.__state
    return playerOrder.some(playerId => !players[playerId].ready)
  }

  public player(playerId: string): M["player"] {
    const { players } = this.__state
    return players[playerId]
  }

  public nextPlayerId(playerId: string, shift: number = 1): string {
    const { playerOrder } = this.__state
    const playerIndex = playerOrder.indexOf(playerId)
    const nextPlayerIndex = mod(playerIndex + shift, playerOrder.length)
    return playerOrder[nextPlayerIndex]
  }

  public update(spec: Spec<M["state"]>): void {
    this.__state = update(this.__state, spec)
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

  public endGame(): void {
    this.update({
      $merge: {
        over: true,
      },
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

  public async resolve(): Promise<void> {
    while (!this.isOver() && !this.isWaitingForAction()) {
      await this.resolveState()
    }
  }

  public onStateChange(onStateChange: StateChangeHandler<M> | null): void {
    this.__onStateChange = onStateChange
  }

  public async post<C extends M["event"]["code"]>(
    code: C,
    data: Omit<Extract<M["event"], { code: C }>, "code">
  ): Promise<void> {
    if (this.__onStateChange) {
      await this.__onStateChange(this.__state, { code, ...data })
    }
  }
}
