import PageContent from "components/layout/PageContent"
import PageLayout from "components/layout/PageLayout"
import Link from "components/ui/Link"
import { useTranslations } from "hooks/useTranslations"
import { ROUTES } from "lib/utils/navigation"

export default function HomePage() {
  const t = useTranslations()

  return (
    <PageLayout title={t.home.pageTitle}>
      <PageContent>
        <Link href={ROUTES.roomList()}>Rooms</Link>
      </PageContent>
    </PageLayout>
  )
}
