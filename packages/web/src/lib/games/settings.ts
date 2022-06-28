import { GameType } from "./types"

export type GameSettings = {
  maxPlayers: number
  minPlayers: number
}

const SETTINGS: {
  [T in GameType]: GameSettings
} = {
  metropolys: {
    maxPlayers: 4,
    minPlayers: 2,
  },
  roborally: {
    maxPlayers: 8,
    minPlayers: 1,
  },
}

export function getGameSettings(game: GameType): GameSettings {
  return SETTINGS[game]
}
