import { PageError } from "@boardgames/components"

import { PageLayout } from "components/ui/PageLayout"
import { ROUTES } from "lib/utils/navigation"

export default function NotFoundPage() {
  const parents = [
    {
      path: ROUTES.home(),
      title: "Homepage",
    },
  ]

  return (
    <PageLayout parents={parents} title="Not found">
      <PageError error="Not found" />
    </PageLayout>
  )
}
