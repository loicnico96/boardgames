import { useQuery, UseQueryResult } from "hooks/db/useQuery"
import { useSearchParam } from "hooks/useSearchParams"
import { Collection } from "lib/db/collections"
import { SortDirection } from "lib/db/types"
import { RoomData } from "lib/model/RoomData"
import { Param } from "lib/utils/navigation"

export function useRoomList(): UseQueryResult<RoomData> {
  const gameParam = useSearchParam(Param.GAME)

  return useQuery<RoomData>(Collection.ROOMS, {
    filter: gameParam
      ? [
          {
            field: "game",
            value: gameParam,
          },
        ]
      : [],
    limit: 10,
    sort: [
      {
        field: "createdAt",
        direction: SortDirection.DESC,
      },
    ],
  })
}
