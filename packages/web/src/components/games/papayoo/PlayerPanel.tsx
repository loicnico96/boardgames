import { PlayerCard } from "./PlayerCard"
import { usePapayooStore } from "./store"

export function PlayerPanel() {
  const playerIds = usePapayooStore(store => store.state.playerOrder)

  return (
    <div>
      {playerIds.map(playerId => (
        <PlayerCard key={playerId} playerId={playerId} />
      ))}
    </div>
  )
}
