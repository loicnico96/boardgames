import { useQuery, UseQueryResult } from "hooks/db/useQuery"
import { Collection } from "lib/db/collections"
import { SortDirection, WithId } from "lib/db/types"
import { GameType } from "lib/games/types"
import { RoomData } from "lib/model/RoomData"
import { useGlobalActions } from "lib/store/global"
import { getLoadedResource, Resource } from "lib/utils/resource"

export function useRoomList(game: GameType | null): UseQueryResult<RoomData> {
  const { setRoomResources } = useGlobalActions()

  return useQuery<RoomData>(
    Collection.ROOMS,
    {
      filter: game
        ? [
            {
              field: "game",
              value: game,
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
    },
    docs => {
      const rooms: Record<string, Resource<WithId<RoomData>>> = {}

      docs.forEach(doc => {
        rooms[doc.id] = getLoadedResource(doc)
      })

      setRoomResources(rooms)
    }
  )
}
