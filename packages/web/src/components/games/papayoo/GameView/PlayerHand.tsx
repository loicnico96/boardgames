import { useCurrentUserId } from "hooks/store/useCurrentUserId"
import { usePlayerAction } from "hooks/usePlayerAction"
import { useTranslations } from "hooks/useTranslations"
import {
  getRequestedColor,
  getSwapCardCount,
  isAbleToDiscard,
  isAbleToPlay,
} from "lib/games/papayoo/cards"
import { GameType } from "lib/games/types"

import {
  usePapayooActions,
  usePapayooPlayer,
  usePapayooState,
  usePapayooStore,
} from "../store"

import { Card } from "./Card"
import { CardList } from "./CardList"

export type PlayerHandProps = {
  isCurrentUser?: boolean
  playerId: string
}

export type PlayerHandCardProps = {
  card: number
  playerId: string
}

export function PlayerHandCard({ card, playerId }: PlayerHandCardProps) {
  const isCurrentUser = useCurrentUserId() === playerId

  const playerAction = usePlayerAction(GameType.PAPAYOO)

  const phase = usePapayooState(state => state.phase)

  const player = usePapayooState(state => state.players[playerId])

  const requestedColor = usePapayooState(state =>
    getRequestedColor(state.cards)
  )

  const swapCardCount = usePapayooState(state =>
    getSwapCardCount(state.playerOrder.length)
  )

  const { swapCard } = usePapayooActions()
  const swapCards = usePapayooStore(store => store.swap.cards)

  const t = useTranslations()

  if (!isCurrentUser) {
    return <Card card={card} />
  }

  switch (phase) {
    case "playCard": {
      if (player.ready) {
        return <Card card={card} tooltip={t.games.papayoo.reason.notYourTurn} />
      }

      if (isAbleToPlay(card, requestedColor)) {
        return (
          <Card
            card={card}
            onClick={() => playerAction({ code: "playCard", card })}
            tooltip={t.games.papayoo.actions.play}
            variant="valid"
          />
        )
      }

      if (isAbleToDiscard(player, requestedColor)) {
        return (
          <Card
            card={card}
            onClick={() => playerAction({ code: "playCard", card })}
            tooltip={t.games.papayoo.actions.discard}
            variant="valid"
          />
        )
      }

      return (
        <Card
          card={card}
          tooltip={t.games.papayoo.reason.notPlayable}
          variant="invalid"
        />
      )
    }

    case "swapCard": {
      const { action } = player
      if (action?.code === "swapCard" && action.cards.includes(card)) {
        return null
      }

      if (swapCards.includes(card)) {
        return null
      }

      if (!player.ready && swapCards.length < swapCardCount) {
        return (
          <Card
            card={card}
            onClick={() => swapCard(card)}
            tooltip={t.games.papayoo.actions.swap}
            variant="valid"
          />
        )
      }

      return <Card card={card} />
    }

    default:
      return <Card card={card} />
  }
}

export function PlayerHand({ playerId }: PlayerHandProps) {
  const cards = usePapayooPlayer(playerId, player => player.cards)

  return (
    <CardList>
      {cards.map(card => (
        <PlayerHandCard card={card} key={card} playerId={playerId} />
      ))}
    </CardList>
  )
}
