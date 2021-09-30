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

  public async resolve<P extends any[]>(
    handler: (context: this, ...args: P) => Promise<void>,
    ...args: P
  ): Promise<this> {
    await handler(this, ...args)
    return this
  }

  public update(spec: Spec<M["state"]>): this {
    this.__state = update(this.__state, spec)
    return this
  }

  public async post(event: M["event"]): Promise<void> {
    if (this.__onStateChange) {
      await this.__onStateChange(this.__state, event)
    }
  }
}
