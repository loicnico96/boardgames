import { useRouter } from "next/router"
import { useCallback } from "react"

import { getAuth } from "hooks/store/useAuth"
import { createRoom } from "lib/api/client/createRoom"
import { GameType } from "lib/games/types"
import { useGlobalStore } from "lib/store/global"
import { Console } from "lib/utils/logger"
import { ROUTES } from "lib/utils/navigation"

export function useCreateRoom(game: GameType | null) {
  const router = useRouter()

  const reason = useGlobalStore(
    useCallback(
      store => {
        const { user } = getAuth(store)

        if (!user) {
          return "notAuthenticated"
        } else if (!user.userInfo.userName) {
          return "noUserName"
        } else if (!game) {
          return "noGameSelected"
        }

        return undefined
      },
      [game]
    )
  )

  const trigger = useCallback(async () => {
    if (game) {
      const data = await createRoom(game)
      router.push(ROUTES.room(game, data.id)).catch(Console.error)
    }
  }, [game, router])

  return [trigger, !!reason, reason] as const
}
