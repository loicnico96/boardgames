import { Directions, identity, movePos } from "@boardgames/utils"
import { useCallback } from "react"

import {
  PlayerCardContainer,
  PlayerCardProps,
  PlayerCardRow,
} from "components/ui/GameView/PlayerCard"
import { getTile } from "lib/games/cacao/board"
import {
  BOARD_SIZE,
  MAX_PLAYER_BEANS,
  MAX_PLAYER_SUN_DISKS,
  MAX_WATER_LEVEL,
  SUN_DISK_SCORE,
  TEMPLE_6_SCORE,
  TEMPLE_8_SCORE,
  WATER_LEVEL_SCORE,
} from "lib/games/cacao/constants"
import { ForestType, isVillageTile } from "lib/games/cacao/model"
import { getTileWorkers } from "lib/games/cacao/state/resolveState"

import { useCacaoPlayer, useCacaoState } from "./store"

export function PlayerCard({ playerId }: PlayerCardProps) {
  const over = useCacaoState(state => state.over)

  const { beans, chocolate, coins, name, ready, sun, water } = useCacaoPlayer(
    playerId,
    identity
  )

  const sunScore = SUN_DISK_SCORE * sun
  const waterScore = WATER_LEVEL_SCORE[water]

  const templeScore = useCacaoState(
    useCallback(
      state => {
        let total = 0

        for (let x = 0; x < BOARD_SIZE; x++) {
          for (let y = 0; y < BOARD_SIZE; y++) {
            const pos = { x, y }
            const tile = getTile(state, pos)
            if (
              tile.type === ForestType.TEMPLE_6 ||
              tile.type === ForestType.TEMPLE_8
            ) {
              const workers: Record<string, number> = {}
              for (const direction of Directions) {
                const villageTile = getTile(state, movePos(pos, direction))
                if (isVillageTile(villageTile)) {
                  const nWorkers = getTileWorkers(villageTile, direction + 2)
                  if (nWorkers > 0) {
                    workers[villageTile.playerId] ??= 0
                    workers[villageTile.playerId] += nWorkers
                  }
                }
              }

              const scores =
                tile.type === ForestType.TEMPLE_8
                  ? TEMPLE_8_SCORE
                  : TEMPLE_6_SCORE

              const highestWorkers = Math.max(...Object.values(workers))
              const highestPlayers = Object.keys(workers).filter(
                id => workers[id] === highestWorkers
              )

              if (workers[playerId] === highestWorkers) {
                total += Math.floor(scores[0] / highestPlayers.length)
              }

              if (highestPlayers.length === 1) {
                const secondHighestWorkers = Math.max(
                  ...Object.values(workers).filter(w => w < highestWorkers)
                )

                const secondHighestPlayers = Object.keys(workers).filter(
                  id => workers[id] === secondHighestWorkers
                )

                if (workers[playerId] === secondHighestWorkers) {
                  total += Math.floor(scores[1] / secondHighestPlayers.length)
                }
              }
            }
          }
        }

        return total
      },
      [playerId]
    )
  )

  return (
    <PlayerCardContainer>
      <PlayerCardRow>
        {name} ({coins}pts)
      </PlayerCardRow>
      <PlayerCardRow>
        Cacao: {beans} + {chocolate} / {MAX_PLAYER_BEANS}
      </PlayerCardRow>
      <PlayerCardRow>
        Water: {water} / {MAX_WATER_LEVEL} ({waterScore}pts)
      </PlayerCardRow>
      <PlayerCardRow>
        Sun disks: {sun} / {MAX_PLAYER_SUN_DISKS} ({sunScore}pts)
      </PlayerCardRow>
      <PlayerCardRow>Temples: {templeScore}pts</PlayerCardRow>
      {over && (
        <PlayerCardRow>
          Final Score: {coins + waterScore + sunScore + templeScore}pts
        </PlayerCardRow>
      )}
      {!over && <PlayerCardRow>{ready ? "Ready" : "Waiting..."}</PlayerCardRow>}
    </PlayerCardContainer>
  )
}
