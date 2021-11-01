import { ComponentType } from "react"

import { PlayerCardProps } from "./PlayerCard"

export type PlayerPanelProps = {
  component: ComponentType<PlayerCardProps>
  playerOrder: string[]
}

export function PlayerPanel({
  component: Component,
  playerOrder,
}: PlayerPanelProps) {
  return (
    <div>
      {playerOrder.map(playerId => (
        <Component key={playerId} playerId={playerId} />
      ))}
    </div>
  )
}
