import { useRouter } from "next/router"
import { useCallback } from "react"

import { getAuth } from "hooks/store/useAuth"
import { getRoomData } from "hooks/store/useRoomData"
import { AsyncHandler } from "hooks/useAsyncHandler"
import { closeRoom } from "lib/api/client/closeRoom"
import { useStore } from "lib/store/context"
import { handleGenericError } from "lib/utils/error"
import { ROUTES } from "lib/utils/navigation"

export enum CloseRoomReason {
  NOT_AUTHENTICATED = "notAuthenticated",
  NOT_OWNER = "notOwner",
}

export function useCloseRoom(
  roomId: string
): [AsyncHandler<[]>, boolean, CloseRoomReason?] {
  const router = useRouter()

  const reason = useStore(
    useCallback(
      store => {
        const { user } = getAuth(store)
        const room = getRoomData(store, roomId)
        if (!user) {
          return CloseRoomReason.NOT_AUTHENTICATED
        } else if (user.userId !== room.ownerId) {
          return CloseRoomReason.NOT_OWNER
        } else {
          return undefined
        }
      },
      [roomId]
    )
  )

  const trigger = useCallback(async () => {
    await closeRoom(roomId)
    router.push(ROUTES.roomList()).catch(handleGenericError)
  }, [roomId, router])

  return [trigger, !reason, reason]
}
