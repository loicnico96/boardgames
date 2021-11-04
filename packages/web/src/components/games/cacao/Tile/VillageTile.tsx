import { getDir, Direction } from "@boardgames/utils"

import { Tooltip } from "components/ui/Tooltip"
import { VillageType } from "lib/games/cacao/model"
import { getVillageWorkers } from "lib/games/cacao/state/resolveState"

import { useCacaoPlayer, useCacaoState } from "../store"

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

  const playerName = useCacaoPlayer(playerId, player => player.name)

  const playerColor = ["yellow", "red", "purple", "white"][playerIndex]

  return (
    <Tooltip text={playerName}>
      <BasicTile background={playerColor} {...props}>
        <div style={{ position: "absolute", top: 0 }}>
          {getVillageWorkers(type, getDir(Direction.NORTH - rot))}
        </div>
        <div style={{ position: "absolute", right: 4 }}>
          {getVillageWorkers(type, getDir(Direction.EAST - rot))}
        </div>
        <div style={{ position: "absolute", bottom: 0 }}>
          {getVillageWorkers(type, getDir(Direction.SOUTH - rot))}
        </div>
        <div style={{ position: "absolute", left: 4 }}>
          {getVillageWorkers(type, getDir(Direction.WEST - rot))}
        </div>
      </BasicTile>
    </Tooltip>
  )
}
