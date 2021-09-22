import { Text } from "@boardgames/components"

import { RouterLink } from "components/ui/RouterLink"
import { useLocation } from "hooks/useLocation"
import { withSearchParams } from "hooks/useSearchParams"
import { useTranslations } from "hooks/useTranslations"
import { Param, ROUTES } from "lib/utils/navigation"

export function LoginLink() {
  const location = useLocation()
  const t = useTranslations()

  const loginUrl = withSearchParams(ROUTES.login(), {
    [Param.REDIRECT]: location,
  })

  return (
    <Text>
      <RouterLink href={loginUrl}>{t.login.pageTitle}</RouterLink>
    </Text>
  )
}
