import { Text } from "@boardgames/components"

import { GameProvider } from "components/providers/GameProvider"
import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { MetropolysSettings } from "lib/games/metropolys/settings"

import { Counter } from "./Counter"

export default function Metropolys() {
  const roomId = useRoomId()
  const t = useTranslations()

  return (
    <GameProvider
      game="metropolys"
      resolveState={MetropolysSettings.resolveState}
      roomId={roomId}
    >
      <Text>{t.games.metropolys.name}</Text>
      <Counter />
    </GameProvider>
  )
}
