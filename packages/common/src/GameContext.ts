import update, { Spec } from "immutability-helper"

import { GameModel, GameStateChangeListener, ReadonlyDeep } from "./types"

export class GameContext<M extends GameModel> {
  private __onStateChange: GameStateChangeListener<M> | undefined
  private __state: ReadonlyDeep<M["state"]>

  public constructor(
    initialState: ReadonlyDeep<M["state"]>,
    onStateChange?: GameStateChangeListener<M>
  ) {
    this.__onStateChange = onStateChange
    this.__state = initialState
  }

  public get state(): ReadonlyDeep<M["state"]> {
    return this.__state
  }

  public update(spec: Spec<ReadonlyDeep<M["state"]>>): this {
    this.__state = update(this.__state, spec)
    return this
  }

  public async post(event: ReadonlyDeep<M["event"]>): Promise<void> {
    if (this.__onStateChange) {
      await this.__onStateChange(this.__state, event)
    }
  }
}
