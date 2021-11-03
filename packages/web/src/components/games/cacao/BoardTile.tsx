import { getTile } from "lib/games/cacao/board"

import { useCacaoState } from "./store"
import { Tile } from "./Tile/Tile"

export type BoardTileProps = {
  x: number
  y: number
}

export function BoardTile({ x, y }: BoardTileProps) {
  const tile = useCacaoState(state => getTile(state, { x, y }))

  return <Tile {...tile} />
}
