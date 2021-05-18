import { renderError } from "components/layout/PageError"
import { renderLoader } from "components/layout/PageLoader"
import { useQuery } from "hooks/db/useQuery"
import { useTranslations } from "hooks/useTranslations"
import { Collection } from "lib/db/collections"
import { QueryOptions, SortDirection, WithId } from "lib/db/types"
import { RoomData } from "lib/model/RoomData"

export type RoomListProviderProps = {
  children: (rooms: WithId<RoomData>[]) => JSX.Element
}

const queryOptions: QueryOptions = {
  sort: [{ field: "createdAt", direction: SortDirection.DESC }],
  limit: 20,
}

export default function RoomListProvider({ children }: RoomListProviderProps) {
  const t = useTranslations()

  const [resource] = useQuery<RoomData>(Collection.ROOMS, queryOptions)

  if (resource.loading) {
    return renderLoader(t.roomList.pageLoading)
  } else if (resource.error) {
    return renderError(resource.error)
  } else {
    return children(resource.data)
  }
}
