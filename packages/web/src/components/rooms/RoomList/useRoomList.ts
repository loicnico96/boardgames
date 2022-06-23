import { compact, generate, SortDir } from "@boardgames/utils"

import { useQuery, UseQueryResult } from "hooks/db/useQuery"
import { GameType } from "lib/games/types"
import { Collection } from "lib/model/collections"
import { RoomData } from "lib/model/RoomData"
import { useGlobalActions } from "lib/store/global"
import { getLoadedResource } from "lib/utils/resource"

const ROOM_DATA_FIELD_GAME: keyof RoomData = "game"
const ROOM_DATA_FIELD_CREATED_AT: keyof RoomData = "createdAt"
const ROOM_LIST_PAGE_SIZE = 10

export function useRoomList(game: GameType | null): UseQueryResult<RoomData> {
  const { setRoomResources } = useGlobalActions()

  return useQuery<RoomData>(
    Collection.ROOMS,
    {
      filter: compact([
        game && {
          field: ROOM_DATA_FIELD_GAME,
          value: game,
        },
      ]),
      limit: ROOM_LIST_PAGE_SIZE,
      sort: [
        {
          field: ROOM_DATA_FIELD_CREATED_AT,
          direction: SortDir.DESC,
        },
      ],
    },
    rooms =>
      setRoomResources(
        generate(rooms, room => [room.id, getLoadedResource(room)])
      )
  )
}
