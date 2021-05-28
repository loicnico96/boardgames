import React from "react"

import Button from "components/ui/Button"
import { useTranslations } from "hooks/useTranslations"
import { WithId } from "lib/db/types"
import { RoomData } from "lib/model/RoomData"

import { useEnterRoom } from "./useEnterRoom"
import { useLeaveRoom } from "./useLeaveRoom"

export type RoomProps = {
  room: WithId<RoomData>
}

export default function Room({ room }: RoomProps) {
  const t = useTranslations()

  const [enterRoom, enterRoomEnabled, enterRoomReason] = useEnterRoom(room)
  const [leaveRoom, leaveRoomEnabled, leaveRoomReason] = useLeaveRoom(room)

  return (
    <div>
      <p>{room.status}</p>
      <p>{JSON.stringify(room.playerOrder)}</p>
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
