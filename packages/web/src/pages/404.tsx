import { PageError } from "@boardgames/components"

import { PageLayout } from "components/PageLayout"
import { ROUTES } from "lib/utils/navigation"

export default function NotFoundPage() {
  const parents = [
    {
      path: ROUTES.home(),
      title: "Home",
    },
  ]

  return (
    <PageLayout parents={parents} title="Are you lost?">
      <PageError error="The page you're looking for doesn't exist." />
    </PageLayout>
  )
}
