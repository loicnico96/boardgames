import { ReactNode } from "react"

import { BoardTile, isForestTile, isVillageTile } from "lib/games/cacao/model"

import { BasicTile } from "./BasicTile"
import { ForestTile } from "./ForestTile"
import { VillageTile } from "./VillageTile"

export type TileProps = BoardTile & {
  children?: ReactNode
  disabled?: boolean
  onClick?: () => void
  selected?: boolean
  size?: number
}

export function Tile(props: TileProps) {
  if (isForestTile(props)) {
    return <ForestTile {...props} />
  }

  if (isVillageTile(props)) {
    return <VillageTile {...props} />
  }

  return <BasicTile {...props} />
}
