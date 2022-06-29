import { GameDefinition } from "@boardgames/common"
import { Metropolys } from "@boardgames/metropolys"
import { Roborally } from "@boardgames/roborally"

import { GameModel, GameType } from "./types"

export const DEFINITIONS: {
  [T in GameType]: GameDefinition<GameModel<T>>
} = {
  metropolys: Metropolys,
  roborally: Roborally,
}

export function getGameDefinition<T extends GameType>(
  game: T
): GameDefinition<GameModel<T>> {
  return DEFINITIONS[game]
}
