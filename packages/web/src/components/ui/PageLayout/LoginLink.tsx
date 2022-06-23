import { Text } from "@boardgames/components"

import { RouterLink } from "components/ui/RouterLink"
import { useLocation } from "hooks/useLocation"
import { useTranslations } from "hooks/useTranslations"
import { ROUTES } from "lib/utils/navigation"

export function LoginLink() {
  const redirectUrl = useLocation()
  const t = useTranslations()

  return (
    <Text>
      <RouterLink href={ROUTES.login(redirectUrl)}>
        {t.login.pageTitle}
      </RouterLink>
    </Text>
  )
}
