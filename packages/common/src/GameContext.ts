import update, { Spec } from "immutability-helper"

import {
  BaseModel,
  State,
  StateChangeListener,
  EventData,
  EventCode,
} from "./GameModel"

export class GameContext<M extends BaseModel> {
  private __onStateChange: StateChangeListener<M> | undefined
  private __state: State<M>

  public constructor(
    initialState: State<M>,
    onStateChange?: StateChangeListener<M>
  ) {
    this.__onStateChange = onStateChange
    this.__state = initialState
  }

  public get state(): State<M> {
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

  public update(spec: Spec<State<M>>): this {
    this.__state = update(this.__state, spec)
    return this
  }

  public async post<C extends EventCode<M>>(
    code: C,
    data: EventData<M, C>
  ): Promise<void> {
    if (this.__onStateChange) {
      await this.__onStateChange(this.__state, { code, ...data })
    }
  }
}
