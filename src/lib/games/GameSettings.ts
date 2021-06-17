import { DocumentData } from "lib/db/types"
import { RoomData } from "lib/model/RoomData"
import { Validator } from "lib/utils/validation"

import { GameType } from "./GameType"
import { MetropolysSettings } from "./metropolys/MetropolysSettings"
import { MetropolysAction } from "./metropolys/model/MetropolysAction"
import { MetropolysEvent } from "./metropolys/model/MetropolysEvent"
import { MetropolysOptions } from "./metropolys/model/MetropolysOptions"
import { MetropolysState } from "./metropolys/model/MetropolysState"
import { RoborallyAction } from "./roborally/model/RoborallyAction"
import { RoborallyEvent } from "./roborally/model/RoborallyEvent"
import { RoborallyOptions } from "./roborally/model/RoborallyOptions"
import { RoborallyState } from "./roborally/model/RoborallyState"
import { RoborallySettings } from "./roborally/RoborallySettings"

export type GameAction<T extends GameType = GameType> = {
  metropolys: MetropolysAction
  roborally: RoborallyAction
}[T]

export type GameEvent<T extends GameType = GameType> = {
  metropolys: MetropolysEvent
  roborally: RoborallyEvent
}[T]

export type GameOptions<T extends GameType = GameType> = {
  metropolys: MetropolysOptions
  roborally: RoborallyOptions
}[T]

export type GameState<T extends GameType = GameType> = {
  metropolys: MetropolysState
  roborally: RoborallyState
}[T]

export type GameSettings<T extends GameType = GameType> = {
  defaultOptions: GameOptions<T>
  minPlayers: number
  maxPlayers: number

  getInitialGameState: (
    roomData: RoomData<T>,
    fetchData: <D extends DocumentData>(docId: string) => Promise<D>
  ) => Promise<GameState<T>>

  resolvePlayerAction: (
    gameState: GameState<T>,
    playerId: string,
    action: GameAction<T>
  ) => Promise<GameState<T>>

  resolveState: (
    gameState: GameState<T>,
    onStateChanged?: (
      newState: GameState<T>,
      event: GameEvent<T>
    ) => Promise<void>
  ) => Promise<GameState<T>>

  validateAction: (
    gameState: GameState<T>,
    playerId: string,
    action: unknown
  ) => GameAction<T>

  validateOptions: Validator<GameOptions<T>>
}

const SETTINGS: {
  [T in GameType]: GameSettings<T>
} = {
  [GameType.METROPOLYS]: MetropolysSettings,
  [GameType.ROBORALLY]: RoborallySettings,
}

export function getGameSettings<T extends GameType>(game: T): GameSettings<T> {
  return SETTINGS[game] as GameSettings<any>
}
