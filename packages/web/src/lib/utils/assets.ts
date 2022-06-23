import { GameType } from "lib/games/types"

import { route } from "./navigation"

const ASSETS_FOLDER = "assets"
const GAMES_FOLDER = "games"

export function getAsset(path: string): string {
  return route(ASSETS_FOLDER, path)
}

export function getGameAsset(game: GameType, path: string): string {
  return route(ASSETS_FOLDER, GAMES_FOLDER, game, path)
}
