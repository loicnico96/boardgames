import { Box, Text } from "@boardgames/components"
import { useCallback } from "react"

import { AsyncButton } from "components/ui/AsyncButton"
import { useAuth } from "hooks/store/useAuth"
import { useGameState } from "hooks/useGameState"
import { useRoomId } from "hooks/useRoomId"
import { playerAction } from "lib/api/client/playerAction"
import {
  getCardColor,
  getCardValue,
  getHighestCard,
  getRequestedColor,
  isCardPlayable,
} from "lib/games/papayoo/cards"
import { CardColor } from "lib/games/papayoo/model"
import { identity } from "lib/utils/types"

export function getCardText(card: number): string {
  return `${CardColor[getCardColor(card)]} (${getCardValue(card)})`
}

export function Game() {
  const { cards, currentPlayerId, playerOrder, players } = useGameState(
    "papayoo",
    identity
  )

  const roomId = useRoomId()
  const { user } = useAuth()

  const isPlayer = !!user && playerOrder.includes(user.userId)
  const player = !!user && isPlayer ? players[user.userId] : null
  const isCurrentPlayer = !!user && user.userId === currentPlayerId
  const requestedColor = getRequestedColor(cards)
  const highestCardIndex = getHighestCard(cards)

  const playCard = useCallback(
    async (card: number) => playerAction("papayoo", roomId, { card }),
    [roomId]
  )

  return (
    <Box direction="column">
      <Text>
        Cards ({cards.length} / {playerOrder.length}):{" "}
        {cards
          .map((card, index) =>
            highestCardIndex === index
              ? `${getCardText(card)}*`
              : getCardText(card)
          )
          .join(", ")}
      </Text>
      {player && (
        <Text>
          {isCurrentPlayer ? "> " : ""}
          {player.name} ({player.score}):{" "}
          {player.cards.map(card => (
            <AsyncButton
              disabled={
                !isCurrentPlayer ||
                player.ready ||
                !isCardPlayable(card, player.cards, requestedColor)
              }
              key={card}
              onClick={() => playCard(card)}
              translations={{
                label: getCardText(card),
                tooltip: "Play",
              }}
            />
          ))}
        </Text>
      )}
    </Box>
  )
}
