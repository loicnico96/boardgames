import React from "react"

import Button from "components/ui/Button"
import { useRoomData } from "hooks/store/useRoomData"
import { useRoomId } from "hooks/store/useRoomId"
import { useTranslations } from "hooks/useTranslations"

import { useEnterRoom } from "./useEnterRoom"
import { useLeaveRoom } from "./useLeaveRoom"

export default function Room() {
  const t = useTranslations()

  const roomId = useRoomId()
  const status = useRoomData(roomId, room => room.status)
  const playerOrder = useRoomData(roomId, room => room.playerOrder)

  const [enterRoom, enterRoomEnabled, enterRoomReason] = useEnterRoom(roomId)
  const [leaveRoom, leaveRoomEnabled, leaveRoomReason] = useLeaveRoom(roomId)

  return (
    <div>
      <p>{status}</p>
      <p>{JSON.stringify(playerOrder)}</p>
      <Button
        disabled={!enterRoomEnabled}
        onClick={enterRoom}
        reason={enterRoomReason}
        translations={t.roomPage.enterRoom}
      />
      <Button
        disabled={!leaveRoomEnabled}
        onClick={leaveRoom}
        reason={leaveRoomReason}
        translations={t.roomPage.leaveRoom}
      />
    </div>
  )
}
