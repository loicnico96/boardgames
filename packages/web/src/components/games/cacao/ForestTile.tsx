import { ForestType } from "lib/games/cacao/model"

import { BoardTile } from "./BoardTile"

export type ForestTileProps = {
  type: ForestType
}

export function ForestTile({ type }: ForestTileProps) {
  return (
    <BoardTile background="green" title={type}>
      {type}
    </BoardTile>
  )
}
