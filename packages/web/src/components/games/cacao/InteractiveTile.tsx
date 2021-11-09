import {
  getAdjacentPos,
  isAdjacentPos,
  isString,
  isSamePos,
} from "@boardgames/utils"
import { useCallback } from "react"

import {
  getTile,
  isEmpty,
  isFillable,
  isForestSpace,
  isVillageSpace,
} from "lib/games/cacao/board"
import { isVillageTile } from "lib/games/cacao/model"

import { BoardTileProps } from "./BoardTile"
import {
  useCacaoActions,
  useCacaoPlayer,
  useCacaoState,
  useCacaoStore,
} from "./store"
import { Tile } from "./Tile/Tile"

export type InteractiveTileProps = BoardTileProps & {
  playerId: string
}

export type InteractiveTileBaseProps = InteractiveTileProps & {
  disabled?: boolean
  onClick: () => void
}

export function InteractiveTile({ playerId, x, y }: InteractiveTileProps) {
  const { selectForestPosition, selectVillagePosition } = useCacaoActions()

  const isRequiringAction = useCacaoPlayer(playerId, player => !player.ready)

  const forest = useCacaoStore(store => store.forest)
  const forests = useCacaoStore(store => store.forests)
  const village = useCacaoStore(store => store.village)

  const tile = useCacaoState(
    useCallback(state => getTile(state, { x, y }), [x, y])
  )

  const selectedForestTile = useCacaoState(
    useCallback(
      state => {
        const pos = { x, y }

        if (forest.index !== null && forest.pos && isSamePos(forest.pos, pos)) {
          return state.tiles[forest.index]
        }

        const confirmedForest = forests.find(f => isSamePos(f.pos, pos))

        if (confirmedForest) {
          return state.tiles[confirmedForest.index]
        }

        return null
      },
      [forest, forests, x, y]
    )
  )

  const selectedVillageTile = useCacaoPlayer(
    playerId,
    useCallback(
      player => {
        const pos = { x, y }

        if (
          village.index !== null &&
          village.pos &&
          isSamePos(village.pos, pos)
        ) {
          return player.hand[village.index]
        }

        return null
      },
      [village, x, y]
    )
  )

  const onClick = isRequiringAction
    ? village.confirmed
      ? () => selectForestPosition(x, y)
      : () => selectVillagePosition(x, y)
    : undefined

  const isSelectable = useCacaoState(
    useCallback(
      state => {
        const pos = { x, y }

        if (village.confirmed) {
          if (forest.index === null) {
            return false
          }

          if (!isForestSpace(pos)) {
            return false
          }

          if (!isEmpty(state, pos)) {
            return false
          }

          if (village.pos === null || !isAdjacentPos(pos, village.pos)) {
            return false
          }

          return isFillable(state, pos, false)
        }

        if (village.index === null) {
          return false
        }

        if (!isVillageSpace(pos)) {
          return false
        }

        const existingTile = getTile(state, pos)

        if (isVillageTile(existingTile)) {
          if (state.deck.length > 0) {
            return false
          }

          if (state.tiles.some(isString)) {
            return false
          }

          const player = state.players[playerId]

          if (player.sun < 1) {
            return false
          }

          return existingTile.playerId === playerId
        }

        return getAdjacentPos(pos).some(p => !isEmpty(state, p))
      },
      [forest, playerId, village, x, y]
    )
  )

  if (selectedForestTile) {
    return (
      <Tile
        disabled={!isSelectable}
        onClick={onClick}
        selected
        type={selectedForestTile}
      />
    )
  }

  if (selectedVillageTile) {
    return (
      <Tile
        disabled={!isSelectable}
        onClick={onClick}
        playerId={playerId}
        rot={village.rot}
        selected
        type={selectedVillageTile}
      />
    )
  }

  return <Tile {...tile} disabled={!isSelectable} onClick={onClick} />
}
