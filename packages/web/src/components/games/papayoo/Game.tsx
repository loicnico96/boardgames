import { Box } from "@boardgames/components"

import { useCurrentUserId } from "hooks/store/useCurrentUserId"
import { useGameState } from "hooks/useGameState"
import {
  getCardColor,
  getCardValue,
  getHighestCard,
} from "lib/games/papayoo/cards"
import { CardColor } from "lib/games/papayoo/model"
import { GameType } from "lib/games/types"
import { fill } from "lib/utils/array"
import { identity } from "lib/utils/types"

import { Banner } from "./Banner"
import { Card } from "./Card"
import { CardList } from "./CardList"
import { PlayerCard } from "./PlayerCard"
import { PlayerHand } from "./PlayerHand"

export function getCardText(card: number): string {
  return `${CardColor[getCardColor(card)]} (${getCardValue(card)})`
}

export function Game() {
  const { cards, currentPlayerId, playerOrder } = useGameState(
    GameType.PAPAYOO,
    identity
  )

  const highestCardIndex = getHighestCard(cards)

  const userId = useCurrentUserId()

  const isPlayer = userId !== null && playerOrder.includes(userId)

  const field = fill(playerOrder.length, index => cards[index] ?? null)

  return (
    <Box alignment="start">
      <Box direction="column" flex={1}>
        <Banner />
        <CardList>
          {field.map((card, index) => (
            <Card
              card={card}
              highlighted={index === highestCardIndex}
              key={index}
            />
          ))}
        </CardList>
        <PlayerHand
          isCurrentUser={isPlayer}
          playerId={isPlayer ? userId : currentPlayerId}
        />
      </Box>
      <div>
        {playerOrder.map(playerId => (
          <PlayerCard key={playerId} playerId={playerId} />
        ))}
      </div>
    </Box>
  )
}
