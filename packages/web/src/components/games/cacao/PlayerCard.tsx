import { Directions, identity, movePos } from "@boardgames/utils"
import { useCallback } from "react"

import {
  PlayerCardContainer,
  PlayerCardProps,
  PlayerCardRow,
} from "components/ui/GameView/PlayerCard"
import { replace } from "config/translations/replace"
import { useTranslations } from "hooks/useTranslations"
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
  const currentPlayerId = useCacaoState(state => state.currentPlayerId)
  const over = useCacaoState(state => state.over)
  const useChocolate = useCacaoState(state => state.options?.useChocolate)

  const t = useTranslations()

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

  const totalScore = coins + waterScore + sunScore + templeScore

  return (
    <PlayerCardContainer>
      <PlayerCardRow>
        {currentPlayerId === playerId && "> "}
        {replace(t.games.cacao.player.name.label, { name, score: coins })}
      </PlayerCardRow>
      <PlayerCardRow>
        {replace(
          useChocolate
            ? t.games.cacao.player.beansWithChocolate.label
            : t.games.cacao.player.beans.label,
          { beans, chocolate, max: MAX_PLAYER_BEANS }
        )}
      </PlayerCardRow>
      <PlayerCardRow>
        {replace(t.games.cacao.player.sun.label, {
          sun,
          max: MAX_PLAYER_SUN_DISKS,
          score: sunScore,
        })}
      </PlayerCardRow>
      <PlayerCardRow>
        {replace(t.games.cacao.player.water.label, {
          water,
          max: MAX_WATER_LEVEL,
          score: waterScore,
        })}
      </PlayerCardRow>
      <PlayerCardRow>
        {replace(t.games.cacao.player.temple.label, { score: templeScore })}
      </PlayerCardRow>
      {over && (
        <PlayerCardRow>
          {replace(t.games.cacao.player.over.label, { score: totalScore })}
        </PlayerCardRow>
      )}
      {!over && (
        <PlayerCardRow>
          {ready
            ? t.games.cacao.player.ready.label
            : t.games.cacao.player.waiting.label}
        </PlayerCardRow>
      )}
    </PlayerCardContainer>
  )
}
