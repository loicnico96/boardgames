import { Text } from "@boardgames/components"

import { RouterLink } from "components/ui/RouterLink"
import { useLocation } from "hooks/useLocation"
import { RouteParam, ROUTES, withSearchParams } from "lib/utils/navigation"

export function LoginLink() {
  const location = useLocation()

  const loginUrl = withSearchParams(ROUTES.login(), {
    [RouteParam.REDIRECT]: location,
  })

  return (
    <Text>
      <RouterLink href={loginUrl}>Login</RouterLink>
    </Text>
  )
}
