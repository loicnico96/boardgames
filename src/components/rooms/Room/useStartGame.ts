import { useCallback } from "react"

import { getAuth } from "hooks/store/useAuth"
import { getRoomData } from "hooks/store/useRoomData"
import { AsyncHandler } from "hooks/useAsyncHandler"
import { trigger } from "lib/api/client"
import { ApiTrigger } from "lib/api/triggers"
import { useStore } from "lib/store/context"

export enum StartGameReason {
  NOT_AUTHENTICATED = "notAuthenticated",
  NOT_OWNER = "notOwner",
}

export function useStartGame(
  roomId: string
): [AsyncHandler<[]>, boolean, StartGameReason?] {
  const reason = useStore(
    useCallback(
      store => {
        const { user } = getAuth(store)
        const room = getRoomData(store, roomId)
        if (!user) {
          return StartGameReason.NOT_AUTHENTICATED
        } else if (user.userId !== room.ownerId) {
          return StartGameReason.NOT_OWNER
        } else {
          return undefined
        }
      },
      [roomId]
    )
  )

  const startGame = useCallback(async () => {
    await trigger(ApiTrigger.START_GAME, { roomId })
  }, [roomId])

  return [startGame, !reason, reason]
}
