import { usePapayooPlayer } from "../store"

import { CardList } from "./CardList"
import { PlayerHandCard } from "./PlayerHandCard"

export type PlayerHandProps = {
  playerId: string
}

export function PlayerHand({ playerId }: PlayerHandProps) {
  const cards = usePapayooPlayer(playerId, player => player.cards)

  return (
    <CardList>
      {cards.map(card => (
        <PlayerHandCard
          card={card}
          key={card}
          playerId={playerId}
        />
      ))}
    </CardList>
  )
}
