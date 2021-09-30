import { Text } from "@boardgames/components"

import { GameProvider } from "components/providers/GameProvider"
import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { RoborallySettings } from "lib/games/roborally/settings"

export default function Roborally() {
  const roomId = useRoomId()
  const t = useTranslations()

  return (
    <GameProvider
      game="roborally"
      resolveState={RoborallySettings.resolveState}
      roomId={roomId}
    >
      <Text>{t.games.roborally.name}</Text>
    </GameProvider>
  )
}
