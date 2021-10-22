import { useCallback } from "react"

import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { playerAction } from "lib/api/client/playerAction"
import {
  getRequestedColor,
  getSwapCardCount,
  isAbleToDiscard,
  isAbleToPlay,
} from "lib/games/papayoo/cards"
import { GameType } from "lib/games/types"

import { Card } from "./Card"
import { CardList } from "./CardList"
import { usePapayooStore } from "./store"

export type PlayerHandProps = {
  isCurrentUser?: boolean
  playerId: string
}

export function PlayerHand({ isCurrentUser, playerId }: PlayerHandProps) {
  const { cards, phase, playerOrder, players } = usePapayooStore(
    store => store.state!
  )
  const { swapCard } = usePapayooStore(store => store.actions)
  const { swap } = usePapayooStore(store => store.ui)

  const roomId = useRoomId()

  const player = players[playerId]

  const requestedColor = getRequestedColor(cards)

  const playCard = useCallback(
    async (card: number) =>
      playerAction(GameType.PAPAYOO, roomId, "playCard", { card }),
    [roomId]
  )

  const swapCount = getSwapCardCount(playerOrder.length)

  const t = useTranslations()

  return (
    <CardList>
      {player.cards
        .filter(card => !swap.includes(card))
        .map(card => {
          const isDiscardable = isAbleToDiscard(player, requestedColor)
          const isPlayable = isAbleToPlay(card, requestedColor)

          const tooltip = {
            playCard: isCurrentUser
              ? player.ready
                ? t.games.papayoo.reason.notYourTurn
                : isPlayable
                ? t.games.papayoo.action.play
                : isDiscardable
                ? t.games.papayoo.action.discard
                : t.games.papayoo.reason.notPlayable
              : undefined,
            nextGame: undefined,
            swapCard: isCurrentUser
              ? player.ready
                ? t.games.papayoo.reason.notYourTurn
                : t.games.papayoo.action.swap
              : undefined,
          }[phase]

          const onClick = {
            playCard: isCurrentUser ? playCard : undefined,
            nextGame: undefined,
            swapCard: isCurrentUser ? swapCard : undefined,
          }[phase]

          const playable = {
            playCard: isPlayable || isDiscardable,
            nextGame: true,
            swapCard: swap.length < swapCount,
          }[phase]

          return (
            <Card
              card={card}
              disabled={player.ready}
              key={card}
              onClick={onClick}
              playable={playable}
              tooltip={tooltip}
            />
          )
        })}
    </CardList>
  )
}
