import { useCurrentUserId } from "hooks/useCurrentUserId"
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

export type PlayerHandCardProps = {
  card: number
  playerId: string
}

export function PlayerHandCard({ card, playerId }: PlayerHandCardProps) {
  const userId = useCurrentUserId()

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

  const swapCardsLocal = usePapayooStore(store => store.swap.cards)
  const swapCards = usePapayooPlayer(playerId, p =>
    p.ready && p.action?.code === "swapCard" ? p.action.cards : swapCardsLocal
  )

  const t = useTranslations()

  if (playerId !== userId) {
    return <Card card={card} />
  }

  if (phase === "playCard") {
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

  if (phase === "swapCard") {
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
  }

  return <Card card={card} />
}
