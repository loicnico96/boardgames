import { PageContent, Box } from "@boardgames/components"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"

import { AsyncButton } from "components/ui/AsyncButton"
import { PageLayout } from "components/ui/PageLayout"
import { useRouteParam } from "hooks/useRouteParam"
import { useTranslations } from "hooks/useTranslations"
import { useAuthContext } from "lib/auth/context"
import { promptUserName } from "lib/auth/promptUserName"
import { Console } from "lib/utils/logger"
import { RouteParam, ROUTES } from "lib/utils/navigation"

export default function LoginPage() {
  const t = useTranslations()
  const redirectUrl = useRouteParam(RouteParam.REDIRECT) ?? ROUTES.home()
  const router = useRouter()

  const { isAuthenticated, isLoading, signInAnonymously, signInWithGoogle } =
    useAuthContext()

  const parents = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  const redirectOnLogin = useCallback(() => {
    router.replace(redirectUrl).catch(Console.error)
  }, [redirectUrl, router])

  useEffect(() => {
    if (isAuthenticated) {
      redirectOnLogin()
    }
  }, [isAuthenticated, redirectOnLogin])

  return (
    <PageLayout parents={parents} title={t.login.pageTitle}>
      <PageContent>
        <Box gap={8}>
          <AsyncButton
            disabled={isAuthenticated || isLoading}
            onClick={async () => {
              const userName = promptUserName(t)
              if (userName) {
                await signInAnonymously(userName)
                redirectOnLogin()
              }
            }}
            translations={t.login.signInAnonymously}
          />
          <AsyncButton
            disabled={isAuthenticated || isLoading}
            onClick={async () => {
              await signInWithGoogle()
              redirectOnLogin()
            }}
            translations={t.login.signInWithGoogle}
          />
        </Box>
      </PageContent>
    </PageLayout>
  )
}
