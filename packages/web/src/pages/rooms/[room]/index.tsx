import { GetServerSideProps } from "next"

import { RoomLobby } from "components/rooms/RoomLobby"
import { RoomProvider } from "components/rooms/RoomProvider"
import { PageLayout } from "components/ui/PageLayout"
import { getParam } from "hooks/useParam"
import { useTranslations } from "hooks/useTranslations"
import { Param, ROUTES } from "lib/utils/navigation"

export type RoomPageProps = {
  roomId: string
}

export default function RoomPage({ roomId }: RoomPageProps) {
  const t = useTranslations()

  const parents = [
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
    <PageLayout parents={parents} title={t.room.pageTitle}>
      <RoomProvider game={null} roomId={roomId}>
        <RoomLobby />
      </RoomProvider>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps<RoomPageProps> = async ({
  params = {},
}) => {
  const roomId = getParam(params, Param.ROOM_ID)

  if (!roomId) {
    return { notFound: true }
  }

  return {
    props: {
      roomId,
    },
  }
}
