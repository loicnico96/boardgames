import { ForestType } from "lib/games/cacao/model"

import { BasicTile } from "./BasicTile"

export type ForestTileProps = {
  disabled?: boolean
  onClick?: () => void
  selected?: boolean
  type: ForestType
}

export function ForestTile({ type, ...props }: ForestTileProps) {
  return (
    <BasicTile background="green" title={type} {...props}>
      {type}
    </BasicTile>
  )
}
