import update, { Spec } from "immutability-helper"

import { GameEvent, GameState, StateChangeHandler } from "./GameSettings"
import { GameType } from "./GameType"

export class GameContext<T extends GameType> {
  onStateChanged?: StateChangeHandler<T>
  state: GameState<T>

  constructor(state: GameState<T>, onStateChanged?: StateChangeHandler<T>) {
    this.onStateChanged = onStateChanged
    this.state = state
  }

  getState(): GameState<T> {
    return this.state
  }

  setState(spec: Spec<GameState<T>>): void {
    this.state = update(this.state, spec)
  }

  async post(event: GameEvent<T>): Promise<void> {
    if (this.onStateChanged) {
      await this.onStateChanged(this.state, event)
    }
  }
}
