import { useState } from "react"

import { renderError } from "components/layout/PageError"
import { renderLoader } from "components/layout/PageLoader"
import { useDocumentListener } from "hooks/db/useDocumentListener"
import { useTranslations } from "hooks/useTranslations"
import { WithId } from "lib/db/types"
import { RoomData, RoomId } from "lib/model/RoomData"
import cache from "lib/utils/cache"

export type RoomProviderProps = {
  children: (room: WithId<RoomData>) => JSX.Element
  roomId: RoomId
}

export default function RoomProvider({ children, roomId }: RoomProviderProps) {
  const t = useTranslations()

  const docRef = `room/${roomId}`

  const [resource, setResource] = useState(cache.get<WithId<RoomData>>(docRef))

  useDocumentListener(docRef, setResource)

  if (resource === undefined || resource.loading) {
    return renderLoader(t.roomPage.pageLoading)
  } else if (resource.error) {
    return renderError(resource.error)
  } else {
    return children(resource.data)
  }
}
