import { useCallback } from "react"

import { getAuth } from "hooks/store/useAuth"
import { getRoomData } from "hooks/store/useRoomData"
import { AsyncHandler } from "hooks/useAsyncHandler"
import { updateRoom } from "lib/api/client/updateRoom"
import { GameOptions } from "lib/games/GameSettings"
import { GameType } from "lib/games/GameType"
import { useStore } from "lib/store/context"

export enum UpdateRoomReason {
  NOT_AUTHENTICATED = "notAuthenticated",
  NOT_OWNER = "notOwner",
}

export function useRoomOptions<T extends GameType>(
  roomId: string
): [
  GameOptions<T>,
  AsyncHandler<[options: GameOptions<T>]>,
  boolean,
  UpdateRoomReason?
] {
  const roomOptions = useStore(
    useCallback(
      store => getRoomData(store, roomId).options as GameOptions<T>,
      [roomId]
    )
  )

  const reason = useStore(
    useCallback(
      store => {
        const { user } = getAuth(store)
        const room = getRoomData(store, roomId)
        if (!user) {
          return UpdateRoomReason.NOT_AUTHENTICATED
        } else if (user.userId !== room.ownerId) {
          return UpdateRoomReason.NOT_OWNER
        } else {
          return undefined
        }
      },
      [roomId]
    )
  )

  const trigger = useCallback(
    async (options: GameOptions<T>) => updateRoom(roomId, { options }),
    [roomId]
  )

  return [roomOptions, trigger, !reason, reason]
}
