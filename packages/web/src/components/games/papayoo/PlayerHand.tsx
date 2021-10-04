import { Box, Text } from "@boardgames/components"
import { useCallback } from "react"

import { useGameState } from "hooks/useGameState"
import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { playerAction } from "lib/api/client/playerAction"
import {
  getRequestedColor,
  isAbleToDiscard,
  isAbleToPlay,
} from "lib/games/papayoo/cards"
import { GameType } from "lib/games/types"
import { identity } from "lib/utils/types"

import { Card } from "./Card"
import { CardList } from "./CardList"

export type PlayerHandProps = {
  isCurrentUser?: boolean
  playerId: string
}

export function PlayerHand({ isCurrentUser, playerId }: PlayerHandProps) {
  const { cards, players } = useGameState(GameType.PAPAYOO, identity)

  const roomId = useRoomId()

  const player = players[playerId]

  const requestedColor = getRequestedColor(cards)

  const playCard = useCallback(
    async (card: number) => playerAction(GameType.PAPAYOO, roomId, { card }),
    [roomId]
  )

  const t = useTranslations()

  return (
    <Box>
      <Text>
        {player.name} ({player.score})
      </Text>
      <CardList>
        {player.cards.map(card => {
          const isDiscardable = isAbleToDiscard(player, requestedColor)
          const isPlayable = isAbleToPlay(card, requestedColor)

          const tooltip = isCurrentUser
            ? player.ready
              ? t.games.papayoo.reason.notYourTurn
              : isPlayable
              ? t.games.papayoo.action.play
              : isDiscardable
              ? t.games.papayoo.action.discard
              : t.games.papayoo.reason.notPlayable
            : undefined

          return (
            <Card
              card={card}
              disabled={player.ready}
              key={card}
              onClick={isCurrentUser ? playCard : undefined}
              playable={isPlayable || isDiscardable}
              tooltip={tooltip}
            />
          )
        })}
      </CardList>
    </Box>
  )
}
