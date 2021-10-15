export type BaseAction = {
  [key: string]: unknown
  code: string
}

export type BaseEvent = {
  [key: string]: unknown
  code: string
}

export type BaseOptions = {
  [key: string]: unknown
}

export type BasePlayer<A extends BaseAction> = {
  action: A | null
  name: string
  ready: boolean
}

export type BaseState<P extends BasePlayer<BaseAction>> = {
  playerOrder: string[]
  players: Record<string, P>
}

export type BaseModel = {
  event: BaseEvent
  options: BaseOptions
  state: BaseState<BasePlayer<BaseAction>>
}

export type Event<M extends BaseModel> = M["event"]

export type EventCode<M extends BaseModel> = Event<M>["code"]

export type EventData<
  M extends BaseModel,
  C extends EventCode<M> = EventCode<M>
> = Omit<Extract<Event<M>, { code: C }>, "code">

export type Options<M extends BaseModel> = M["options"]

export type State<M extends BaseModel> = M["state"]

export type Player<M extends BaseModel> = State<M>["players"][string]

export type Action<M extends BaseModel> = Extract<
  Player<M>["action"],
  BaseAction
>

export type ActionCode<M extends BaseModel> = Action<M>["code"]

export type ActionData<
  M extends BaseModel,
  C extends ActionCode<M> = ActionCode<M>
> = Omit<Extract<Action<M>, { code: C }>, "code">

export type StateChangeListener<M extends BaseModel> = (
  newState: State<M>,
  event: Event<M>
) => Promise<void>
