import { BaseContext } from "@boardgames/common"

import { CacaoContext } from "./cacao/context"
import { MetropolysContext } from "./metropolys/context"
import { PapayooContext } from "./papayoo/context"
import { RoborallyContext } from "./roborally/context"
import { GameModels, GameType } from "./types"

export type Constructor<T, P extends any[] = []> = new (...args: P) => T

export type GameContext<T extends GameType> = BaseContext<GameModels[T]>

const CONTEXT: {
  [T in GameType]: Constructor<GameContext<T>>
} = {
  cacao: CacaoContext,
  metropolys: MetropolysContext,
  papayoo: PapayooContext,
  roborally: RoborallyContext,
}

export function getGameContext<T extends GameType>(game: T): GameContext<T> {
  return new CONTEXT[game]() as GameContext<T>
}
