import { Text } from "@boardgames/components"

import { GameProvider } from "components/providers/GameProvider"
import { useRoomId } from "hooks/useRoomId"
import { useTranslations } from "hooks/useTranslations"
import { RoborallyApi } from "lib/games/roborally/api"
export default function Roborally() {
  const roomId = useRoomId()
  const t = useTranslations()

  return (
    <GameProvider api={RoborallyApi} game="roborally" roomId={roomId}>
      <Text>{t.games.roborally.name}</Text>
    </GameProvider>
  )
}
