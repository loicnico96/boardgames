import update, { Spec } from "immutability-helper"

import { GameModel, GameStateChangeListener } from "./types"

export class GameContext<M extends GameModel> {
  private __onStateChange: GameStateChangeListener<M> | undefined
  private __state: M["state"]

  public constructor(
    initialState: M["state"],
    onStateChange?: GameStateChangeListener<M>
  ) {
    this.__onStateChange = onStateChange
    this.__state = initialState
  }

  public get state(): M["state"] {
    return this.__state
  }

  public allReady(): boolean {
    const { playerOrder, players } = this.__state
    return playerOrder.every(playerId => players[playerId].ready)
  }

  public nextPlayerId(playerId: string, shift: number = 1): string {
    const { playerOrder } = this.__state
    const playerIndex = playerOrder.indexOf(playerId)
    return playerOrder[(playerIndex + shift) % playerOrder.length]
  }

  public update(spec: Spec<M["state"]>): this {
    this.__state = update(this.__state, spec)
    return this
  }

  public async post<T extends M["event"]["code"]>(
    ...[code, data]: { code: T } extends M["event"]
      ? [
          code: T,
          data?: Omit<Extract<M["event"] & { code: T }, { code: T }>, "code">
        ]
      : [
          code: T,
          data: Omit<Extract<M["event"] & { code: T }, { code: T }>, "code">
        ]
  ): Promise<void> {
    if (this.__onStateChange) {
      await this.__onStateChange(this.__state, { code, ...data })
    }
  }
}
