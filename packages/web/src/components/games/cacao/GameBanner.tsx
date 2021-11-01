import { mod } from "@boardgames/utils"
import { useCallback } from "react"

import { AsyncButton } from "components/ui/AsyncButton"
import { Banner } from "components/ui/GameView/Banner"
import { usePlayerAction } from "hooks/usePlayerAction"
import { VillageType } from "lib/games/cacao/model"
import { GameType } from "lib/games/types"

import { useCacaoActions, useCacaoPlayer, useCacaoStore } from "./store"

export type GameBannerProps = {
  playerId: string
}

export function GameBanner({ playerId }: GameBannerProps) {
  const selectedIndex = useCacaoStore(store => store.village.index)
  const selectedPos = useCacaoStore(store => store.village.pos)
  const selectedRot = useCacaoStore(store => store.village.rot)
  const confirmed = useCacaoStore(store => store.village.confirmed)
  const forests = useCacaoStore(store => store.forests)

  const { resetSelection, rotateVillageTile } = useCacaoActions()

  const isReady = useCacaoPlayer(playerId, player => player.ready)

  const selectedTile = useCacaoPlayer(playerId, player =>
    selectedIndex !== null ? player.hand[selectedIndex] : null
  )

  const playerAction = usePlayerAction(GameType.CACAO)

  const confirmTile = useCallback(async () => {
    if (selectedIndex !== null && selectedPos !== null) {
      await playerAction({
        code: "playTile",
        forests,
        village: {
          index: selectedIndex,
          rot: mod(selectedRot, 4),
          pos: selectedPos,
        },
      })
      resetSelection()
    }
  }, [
    forests,
    playerAction,
    resetSelection,
    selectedPos,
    selectedIndex,
    selectedRot,
  ])

  if (isReady) {
    return null
  }

  if (confirmed) {
    return (
      <Banner>
        Choose a Forest tile to place
        <AsyncButton
          onClick={async () => resetSelection}
          translations={{ label: "Reset" }}
        />
        <AsyncButton
          disabled={selectedTile === null || selectedPos === null}
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
        disabled={selectedTile === null || selectedPos === null}
        onClick={confirmTile}
        translations={{ label: "Confirm" }}
      />
    </Banner>
  )
}
