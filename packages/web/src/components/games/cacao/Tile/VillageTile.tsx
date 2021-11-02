import { dir, Direction } from "@boardgames/utils"

import { VillageType } from "lib/games/cacao/model"
import { getVillageWorkers } from "lib/games/cacao/state/resolveState"

import { useCacaoState } from "../store"

import { BasicTile } from "./BasicTile"

export type VillageTileProps = {
  disabled?: boolean
  rot?: number
  onClick?: () => void
  playerId: string
  selected?: boolean
  type: VillageType
}

export function VillageTile({
  playerId,
  type,
  rot = 0,
  ...props
}: VillageTileProps) {
  const playerIndex = useCacaoState(state =>
    state.playerOrder.indexOf(playerId)
  )

  const playerColor = ["yellow", "red", "purple", "white"][playerIndex]

  return (
    <BasicTile background={playerColor} title={type} {...props}>
      <div style={{ position: "absolute", top: 0 }}>
        {getVillageWorkers(type, dir(Direction.NORTH + rot))}
      </div>
      <div style={{ position: "absolute", right: 4 }}>
        {getVillageWorkers(type, dir(Direction.WEST + rot))}
      </div>
      <div style={{ position: "absolute", bottom: 0 }}>
        {getVillageWorkers(type, dir(Direction.EAST + rot))}
      </div>
      <div style={{ position: "absolute", left: 4 }}>
        {getVillageWorkers(type, dir(Direction.SOUTH + rot))}
      </div>
    </BasicTile>
  )
}
