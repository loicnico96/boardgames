import { dir, getAdjacentPositions, identity } from "@boardgames/utils"
import { useCallback } from "react"

import { AsyncButton } from "components/ui/AsyncButton"
import { Banner } from "components/ui/GameView/Banner"
import { usePlayerAction } from "hooks/usePlayerAction"
import { isFillable } from "lib/games/cacao/board"
import { VillageType } from "lib/games/cacao/model"
import { GameType } from "lib/games/types"

import {
  useCacaoActions,
  useCacaoPlayer,
  useCacaoState,
  useCacaoStore,
} from "./store"

export type GameBannerProps = {
  playerId: string
}

export function GameBanner({ playerId }: GameBannerProps) {
  const forest = useCacaoStore(store => store.forest)
  const forests = useCacaoStore(store => store.forests)
  const village = useCacaoStore(store => store.village)

  const {
    confirmForestTile,
    confirmVillageTile,
    resetSelection,
    rotateVillageTile,
  } = useCacaoActions()

  const isReady = useCacaoPlayer(playerId, player => player.ready)

  const selectedVillageTile = useCacaoPlayer(playerId, player =>
    village.index !== null ? player.hand[village.index] : null
  )

  const selectedForestTile = useCacaoState(state =>
    forest.index !== null ? state.tiles[forest.index] : null
  )

  const state = useCacaoState(identity)

  const playerAction = usePlayerAction(GameType.CACAO)

  const confirmTile = useCallback(async () => {
    if (village.index !== null && village.pos !== null) {
      const forestTiles = state.tiles.filter(tile => tile !== null)

      const fillPositions = getAdjacentPositions(village.pos).filter(
        forestPos => isFillable(state, forestPos, false)
      )

      const fillCount = Math.min(fillPositions.length, forestTiles.length)

      if (village.confirmed) {
        if (forest.index !== null && forest.pos !== null) {
          if (fillCount === forests.length + 1) {
            await playerAction({
              code: "playTile",
              forests: [
                ...forests,
                {
                  index: forest.index,
                  pos: forest.pos,
                },
              ],
              village: {
                index: village.index,
                rot: dir(village.rot),
                pos: village.pos,
              },
            })

            resetSelection()
          } else {
            confirmForestTile()
          }
        }
      } else if (fillCount === 0) {
        await playerAction({
          code: "playTile",
          forests: [],
          village: {
            index: village.index,
            rot: dir(village.rot),
            pos: village.pos,
          },
        })

        resetSelection()
      } else {
        confirmVillageTile()
      }
    }
  }, [
    confirmForestTile,
    confirmVillageTile,
    forest,
    forests,
    playerAction,
    resetSelection,
    state,
    village,
  ])

  if (isReady) {
    return null
  }

  if (village.confirmed) {
    const isAbleToConfirm = selectedForestTile !== null && forest.pos !== null

    return (
      <Banner>
        {selectedForestTile !== null
          ? "Choose a Forest space to fill"
          : "Choose a Forest tile to place"}
        <AsyncButton
          onClick={resetSelection}
          translations={{ label: "Reset" }}
        />
        <AsyncButton
          disabled={!isAbleToConfirm}
          onClick={confirmTile}
          translations={{ label: "Confirm" }}
        />
      </Banner>
    )
  }

  const isAbleToConfirm = selectedVillageTile !== null && village.pos !== null
  const isAbleToRotate =
    selectedVillageTile !== null &&
    selectedVillageTile !== VillageType.VILLAGE_1111

  return (
    <Banner>
      {selectedVillageTile !== null
        ? "Choose a Village space to build on"
        : "Choose a Village tile to place"}
      <AsyncButton
        disabled={!isAbleToRotate}
        onClick={() => rotateVillageTile(3)}
        translations={{ label: "Rotate left" }}
      />
      <AsyncButton
        disabled={!isAbleToRotate}
        onClick={() => rotateVillageTile(1)}
        translations={{ label: "Rotate right" }}
      />
      <AsyncButton
        disabled={!isAbleToConfirm}
        onClick={confirmTile}
        translations={{ label: "Confirm" }}
      />
    </Banner>
  )
}
