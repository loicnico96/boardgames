import { BaseContext, UserInfo } from "@boardgames/common"

import { RoomData } from "lib/model/RoomData"

import { MetropolysContext } from "./metropolys/context"
import { PapayooContext } from "./papayoo/context"
import { RoborallyContext } from "./roborally/context"
import { GameModels, GameOptions, GameState, GameType } from "./types"

export type Constructor<T, P extends any[]> = new (...args: P) => T

export type GameContext<T extends GameType> = BaseContext<GameModels[T]>

const CONTEXT: {
  [T in GameType]: Constructor<GameContext<T>, [state: GameState<T>]> &
    Constructor<
      GameContext<T>,
      [
        playerOrder: string[],
        players: Record<string, UserInfo>,
        options: GameOptions<T>
      ]
    >
} = {
  metropolys: MetropolysContext,
  papayoo: PapayooContext,
  roborally: RoborallyContext,
}

export function createGameContext<T extends GameType>(
  room: RoomData<T>
): GameContext<T> {
  const constructor = CONTEXT[room.game] as Constructor<
    GameContext<T>,
    [
      playerOrder: string[],
      players: Record<string, UserInfo>,
      options: GameOptions<T>
    ]
  >

  return new constructor(room.playerOrder, room.players, room.options)
}

export function getGameContext<T extends GameType>(
  game: T,
  state: GameState<T>
): GameContext<T> {
  const constructor = CONTEXT[game] as Constructor<
    GameContext<T>,
    [state: GameState<T>]
  >

  return new constructor(state)
}
