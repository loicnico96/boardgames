import { PageContent, Box } from "@boardgames/components"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { toast } from "react-toastify"

import { AsyncButton } from "components/ui/AsyncButton"
import { PageLayout } from "components/ui/PageLayout"
import { useRouteParam } from "hooks/useRouteParam"
import { useTranslations } from "hooks/useTranslations"
import { Console } from "lib/utils/logger"
import { RouteParam, ROUTES } from "lib/utils/navigation"

export default function LoginPage() {
  const redirectUrl = useRouteParam(RouteParam.REDIRECT) ?? ROUTES.home()
  const router = useRouter()
  const t = useTranslations()

  // TODO
  const isAuthenticated = false

  // TODO
  const signInAsGuest = () => toast.success("signed in!")

  // TODO
  const signInWithGoogle = () => toast.success("signed in!")

  const parents = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectUrl).catch(Console.error)
    }
  }, [isAuthenticated, redirectUrl, router])

  return (
    <PageLayout parents={parents} title={t.login.pageTitle}>
      <PageContent>
        <Box gap={8}>
          <AsyncButton
            disabled={isAuthenticated}
            onClick={signInAsGuest}
            translations={t.login.signInAnonymously}
          />
          <AsyncButton
            disabled={isAuthenticated}
            onClick={signInWithGoogle}
            translations={t.login.signInWithGoogle}
          />
        </Box>
      </PageContent>
    </PageLayout>
  )
}
