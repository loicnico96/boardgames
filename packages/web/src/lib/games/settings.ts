import { GameType } from "./types"

export type GameSettings = {
  maxPlayers: number
  minPlayers: number
}

export const SETTINGS: Record<GameType, GameSettings> = {
  cacao: {
    maxPlayers: 4,
    minPlayers: 2,
  },
  metropolys: {
    maxPlayers: 4,
    minPlayers: 2,
  },
  papayoo: {
    maxPlayers: 8,
    minPlayers: 3,
  },
  roborally: {
    maxPlayers: 8,
    minPlayers: 1,
  },
}
