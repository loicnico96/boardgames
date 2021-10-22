import { Box } from "@boardgames/components"

import { useCurrentUserId } from "hooks/store/useCurrentUserId"
import {
  getCardColor,
  getCardValue,
  getHighestCard,
  getSwapCardCount,
} from "lib/games/papayoo/cards"
import { CardColor } from "lib/games/papayoo/model"
import { fill } from "lib/utils/array"

import { Banner } from "./Banner"
import { Card } from "./Card"
import { CardList } from "./CardList"
import { PlayerCard } from "./PlayerCard"
import { PlayerHand } from "./PlayerHand"
import { usePapayooStore } from "./store"

export function getCardText(card: number): string {
  return `${CardColor[getCardColor(card)]} (${getCardValue(card)})`
}

export function Game() {
  const { cards, currentPlayerId, phase, playerOrder, players } =
    usePapayooStore(store => store.state!)
  const { unswapCard } = usePapayooStore(store => store.actions)
  const { swap } = usePapayooStore(store => store.ui)

  const highestCardIndex = getHighestCard(cards)

  const userId = useCurrentUserId()

  const isPlayer = userId !== null && playerOrder.includes(userId)
  const swapCount = getSwapCardCount(playerOrder.length)

  const playField = fill(playerOrder.length, index => cards[index] ?? null)
  const swapField = fill(swapCount, index => swap[index] ?? null)

  return (
    <Box alignment="start">
      <Box direction="column" flex={1}>
        <Banner />
        {phase === "swapCard" ? (
          <CardList>
            {swapField.map((card, index) => (
              <Card
                card={card}
                disabled={!userId || players[userId]?.ready}
                onClick={unswapCard}
                playable
                key={index}
              />
            ))}
          </CardList>
        ) : (
          <CardList>
            {playField.map((card, index) => (
              <Card
                card={card}
                highlighted={index === highestCardIndex}
                key={index}
              />
            ))}
          </CardList>
        )}
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
