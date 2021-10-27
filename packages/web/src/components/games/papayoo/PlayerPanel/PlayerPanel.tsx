import { usePapayooState } from "../store"

import { PlayerCard } from "./PlayerCard"

export function PlayerPanel() {
  const playerIds = usePapayooState(state => state.playerOrder)

  return (
    <div>
      {playerIds.map(playerId => (
        <PlayerCard key={playerId} playerId={playerId} />
      ))}
    </div>
  )
}
