import { useGameState } from "hooks/store/useGameState"
import { GameType } from "lib/games/GameType"

export default function Metropolys() {
  const playerOrder = useGameState(GameType.METROPOLYS, s => s.playerOrder)
  const players = useGameState(GameType.METROPOLYS, s => s.players)

  return (
    <div>
      {playerOrder.map(playerId => (
        <div key={playerId}>
          {playerId} - {JSON.stringify(players[playerId])}
        </div>
      ))}
    </div>
  )
}
