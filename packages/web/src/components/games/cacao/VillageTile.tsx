import { VillageType } from "lib/games/cacao/model"

import { BoardTile } from "./BoardTile"
import { useCacaoState } from "./store"

export type VillageTileProps = {
  disabled?: boolean
  rot?: number
  onClick?: () => void
  playerId: string
  selected?: boolean
  type: VillageType
}

export function VillageTile({ playerId, ...props }: VillageTileProps) {
  const playerIndex = useCacaoState(state =>
    state.playerOrder.indexOf(playerId)
  )

  const playerColor = ["yellow", "red", "purple", "white"][playerIndex]

  return (
    <BoardTile background={playerColor} title={props.type} {...props}>
      {props.type}
    </BoardTile>
  )
}
