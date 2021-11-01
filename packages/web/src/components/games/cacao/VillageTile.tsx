import { VillageType } from "lib/games/cacao/model"

import { BoardTile } from "./BoardTile"
import { useCacaoState } from "./store"

export type VillageTileProps = {
  rot?: number
  playerId: string
  type: VillageType
}

export function VillageTile({ playerId, rot = 0, type }: VillageTileProps) {
  const playerIndex = useCacaoState(state =>
    state.playerOrder.indexOf(playerId)
  )

  const playerColor = ["yellow", "red", "purple", "white"][playerIndex]

  return (
    <BoardTile background={playerColor} rot={rot} title={type}>
      {type}
    </BoardTile>
  )
}
