import { Text, PageContent } from "@boardgames/components"
import { useCallback } from "react"

import { AsyncButton } from "components/ui/AsyncButton"
import { PageLayout } from "components/ui/PageLayout"
import { RouterLink } from "components/ui/RouterLink"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { useTranslations } from "hooks/useTranslations"
import { apiCall, apiPath } from "lib/api/client/utils"
import { HttpMethod } from "lib/api/types"
import { AuthUserInfo } from "lib/auth/types"
import { ROUTES } from "lib/utils/navigation"

export default function HomePage() {
  const t = useTranslations()

  const [onClick] = useAsyncHandler(
    useCallback(async () => {
      const result = await apiCall<AuthUserInfo>(
        HttpMethod.POST,
        apiPath("test")
      )
      // eslint-disable-next-line no-alert
      window.alert(result.email)
    }, [])
  )

  return (
    <PageLayout title={t.home.pageTitle}>
      <PageContent>
        <Text>
          <AsyncButton
            marginRight={8}
            onClick={onClick}
            translations={{ label: "Test" }}
          />
          <RouterLink href={ROUTES.roomList()}>
            {t.roomList.pageTitle}
          </RouterLink>
        </Text>
      </PageContent>
    </PageLayout>
  )
}
