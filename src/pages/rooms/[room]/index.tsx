import PageError from "components/layout/PageError"
import PageLayout from "components/layout/PageLayout"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import { getParam } from "hooks/useParam"
import { useTranslations } from "hooks/useTranslations"
import { getRoomRef } from "lib/db/collections"
import { firestore } from "lib/firebase/admin"
import { RoomData } from "lib/model/RoomData"
import { Param, ROUTES } from "lib/utils/navigation"
import { SSR } from "lib/utils/ssr"

export default function RoomNotFoundPage() {
  const t = useTranslations()

  const parents: BreadcrumbsParent[] = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
    {
      path: ROUTES.roomList(),
      title: t.roomList.pageTitle,
    },
  ]

  return (
    <PageLayout parents={parents} title="Are you lost?">
      <PageError error="This room does not exist or has been closed." />
    </PageLayout>
  )
}

export const getServerSideProps = SSR(async (params, redirect) => {
  const roomId = getParam(params, Param.ROOM_ID)
  if (roomId) {
    const roomRef = getRoomRef(roomId)
    const roomDoc = await firestore.doc(roomRef).get()
    if (roomDoc.exists) {
      const { game } = roomDoc.data() as RoomData
      redirect({
        destination: ROUTES.room(game, roomId),
        permanent: true,
      })
    }
  }
})
