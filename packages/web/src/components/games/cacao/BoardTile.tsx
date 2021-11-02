import { Pos, samePos } from "@boardgames/utils"

import { isVillageTile } from "lib/games/cacao/model"
import {
  getAdjacentPositions,
  getTile,
  isFillable,
} from "lib/games/cacao/state/validateAction"

import { useCacaoActions, useCacaoState, useCacaoStore } from "./store"
import { Tile, TileProps } from "./Tile/Tile"

export type BoardTileProps = {
  x: number
  y: number
}

export type InteractiveTileProps = BoardTileProps & {
  playerId: string
}

export function InteractiveTile({ playerId, x, y }: InteractiveTileProps) {
  const pos: Pos = { x, y }

  const tile = useCacaoState(state => getTile(state, pos))

  const forest = useCacaoStore(store => store.forest)
  const forests = useCacaoStore(store => store.forests)
  const village = useCacaoStore(store => store.village)

  const { selectForestPosition, selectVillagePosition } = useCacaoActions()

  const isForestSpace = x % 2 === y % 2

  const tileProps = useCacaoState<TileProps>(state => {
    const player = state.players[playerId]

    const onClick = player.ready
      ? undefined
      : village.confirmed
      ? forest.index !== null
        ? () => selectForestPosition(x, y)
        : undefined
      : village.index !== null
      ? () => selectVillagePosition(x, y)
      : undefined

    const selectable = village.confirmed
      ? isForestSpace &&
        village.pos !== null &&
        tile.type === null &&
        getAdjacentPositions(village.pos).some(p => samePos(p, pos)) &&
        isFillable(state, pos, 1)
      : !isForestSpace &&
        (tile.type === null ||
          (player.sun > 0 &&
            isVillageTile(tile) &&
            tile.playerId === playerId)) &&
        getAdjacentPositions(pos).some(p => getTile(state, p).type !== null)

    if (
      village.index !== null &&
      village.pos !== null &&
      samePos(village.pos, pos)
    ) {
      const type = player.hand[village.index]
      return {
        disabled: onClick ? !selectable : undefined,
        onClick,
        playerId,
        rot: village.rot,
        selected: true,
        type,
      }
    }

    if (
      forest.index !== null &&
      forest.pos !== null &&
      samePos(forest.pos, pos)
    ) {
      const type = state.tiles[forest.index]
      if (type !== null) {
        return {
          disabled: onClick ? !selectable : undefined,
          onClick,
          selected: true,
          type,
        }
      }
    }

    const confirmedForest = forests.find(f => samePos(f.pos, pos))
    if (confirmedForest) {
      const type = state.tiles[confirmedForest.index]
      if (type !== null) {
        return {
          disabled: onClick ? !selectable : undefined,
          onClick,
          selected: true,
          type,
        }
      }
    }

    return {
      ...tile,
      disabled: onClick ? !selectable : undefined,
      onClick,
    }
  })

  return <Tile {...tileProps} />
}

export function BoardTile({ x, y }: BoardTileProps) {
  const tile = useCacaoState(state => state.board[x]?.[y] ?? { type: null })

  return <Tile {...tile} />
}
