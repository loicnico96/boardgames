import { useQuery, UseQueryResult } from "hooks/db/useQuery"
import { useActions } from "hooks/store/useActions"
import { Collection } from "lib/db/collections"
import { SortDirection, WithId } from "lib/db/types"
import { GameType } from "lib/games"
import { RoomData } from "lib/model/RoomData"
import { getLoadedResource, Resource } from "lib/utils/resource"

export function useRoomList(game: GameType | null): UseQueryResult<RoomData> {
  const { setRoomResources } = useActions()

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
