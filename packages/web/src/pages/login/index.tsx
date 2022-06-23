import { PageContent, Box } from "@boardgames/components"
import { useRouter } from "next/router"
import { useEffect } from "react"

import { AsyncButton } from "components/ui/AsyncButton"
import { PageLayout } from "components/ui/PageLayout"
import { useTranslations } from "hooks/useTranslations"
import { useAuthContext } from "lib/auth/context"
import { promptUserName } from "lib/auth/promptUserName"
import { Console } from "lib/utils/logger"
import { getParam, RouteParam, ROUTES } from "lib/utils/navigation"

export default function LoginPage() {
  const t = useTranslations()

  const router = useRouter()
  const redirectUrl = getParam(router.query, RouteParam.REDIRECT)

  const { isAuthenticated, isLoading, signInAnonymously, signInWithGoogle } =
    useAuthContext()

  const parents = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectUrl ?? ROUTES.home()).catch(Console.error)
    }
  }, [isAuthenticated, redirectUrl, router])

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
              }
            }}
            translations={t.login.signInAnonymously}
          />
          <AsyncButton
            disabled={isAuthenticated || isLoading}
            onClick={signInWithGoogle}
            translations={t.login.signInWithGoogle}
          />
        </Box>
      </PageContent>
    </PageLayout>
  )
}
