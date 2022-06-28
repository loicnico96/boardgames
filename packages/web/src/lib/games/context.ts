import { BaseContext } from "@boardgames/common"

import { MetropolysContext } from "./metropolys/context"
import { RoborallyContext } from "./roborally/context"
import { GameModel, GameType } from "./types"

export type Constructor<T, P extends any[] = []> = new (...args: P) => T

export type GameContext<T extends GameType> = BaseContext<GameModel<T>>

const CONTEXTS: {
  [T in GameType]: Constructor<GameContext<T>>
} = {
  metropolys: MetropolysContext,
  roborally: RoborallyContext,
}

export function getGameContext<T extends GameType>(game: T): GameContext<T> {
  return new CONTEXTS[game]()
}
