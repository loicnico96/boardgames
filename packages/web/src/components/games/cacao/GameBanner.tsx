import { identity, mod } from "@boardgames/utils"
import { useCallback } from "react"

import { AsyncButton } from "components/ui/AsyncButton"
import { Banner } from "components/ui/GameView/Banner"
import { usePlayerAction } from "hooks/usePlayerAction"
import { VillageType } from "lib/games/cacao/model"
import { getForestFillPositions } from "lib/games/cacao/state/validateAction"
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

  const selectedTile = useCacaoPlayer(playerId, player =>
    village.index !== null ? player.hand[village.index] : null
  )

  const selectedForestTile = useCacaoState(state =>
    forest.index !== null ? state.tiles[forest.index] : null
  )

  const state = useCacaoState(identity)

  const playerAction = usePlayerAction(GameType.CACAO)

  const confirmTile = useCallback(async () => {
    if (village.index !== null && village.pos !== null) {
      if (village.confirmed) {
        if (forest.index !== null && forest.pos !== null) {
          const fillPositions = getForestFillPositions(state, village.pos, 1)
          const fillCount = Math.min(
            fillPositions.length,
            state.tiles.filter(t => t !== null).length
          )

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
                rot: mod(village.rot, 4),
                pos: village.pos,
              },
            })

            resetSelection()
          } else {
            confirmForestTile()
          }
        }
      } else {
        const fillPositions = getForestFillPositions(state, village.pos, 1)
        const fillCount = Math.min(
          fillPositions.length,
          state.tiles.filter(t => t !== null).length
        )

        if (fillCount === 0) {
          await playerAction({
            code: "playTile",
            forests: [],
            village: {
              index: village.index,
              rot: mod(village.rot, 4),
              pos: village.pos,
            },
          })

          resetSelection()
        } else {
          confirmVillageTile()
        }
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
    return (
      <Banner>
        Choose a Forest tile to place
        <AsyncButton
          onClick={async () => resetSelection()}
          translations={{ label: "Reset" }}
        />
        <AsyncButton
          disabled={selectedForestTile === null || forest.pos === null}
          onClick={confirmTile}
          translations={{ label: "Confirm" }}
        />
      </Banner>
    )
  }

  return (
    <Banner>
      Choose a Village tile to place
      <AsyncButton
        disabled={
          selectedTile === null || selectedTile === VillageType.VILLAGE_1111
        }
        onClick={async () => rotateVillageTile(-1)}
        translations={{ label: "Rotate left" }}
      />
      <AsyncButton
        disabled={
          selectedTile === null || selectedTile === VillageType.VILLAGE_1111
        }
        onClick={async () => rotateVillageTile(1)}
        translations={{ label: "Rotate right" }}
      />
      <AsyncButton
        disabled={selectedTile === null || village.pos === null}
        onClick={confirmTile}
        translations={{ label: "Confirm" }}
      />
    </Banner>
  )
}
