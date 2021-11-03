import { Headline, Text, PageContent, Box } from "@boardgames/components"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"

import { AsyncButton } from "components/ui/AsyncButton"
import { PageLayout } from "components/ui/PageLayout"
import { useSearchParam } from "hooks/useSearchParams"
import { useTranslations } from "hooks/useTranslations"
import { useAuthContext } from "lib/auth/context"
import { promptUserName } from "lib/auth/promptUserName"
import { signInAnonymously, signInWithGoogle } from "lib/firebase/auth"
import { Console } from "lib/utils/logger"
import { Param, ROUTES } from "lib/utils/navigation"

export default function LoginPage() {
  const t = useTranslations()

  const router = useRouter()

  const { isAuthenticated, setUserName } = useAuthContext()

  const redirectTo = useSearchParam(Param.REDIRECT) ?? ROUTES.home()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo).catch(Console.error)
    }
  }, [isAuthenticated, redirectTo, router])

  const parents = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  const signInAsGuest = useCallback(async () => {
    const userName = promptUserName(t)
    if (userName) {
      await signInAnonymously(userName)
      setUserName(userName)
    }
  }, [setUserName, t])

  return (
    <PageLayout parents={parents} title={t.login.pageTitle}>
      <PageContent>
        <Headline>Title</Headline>
        <Text>Paragraph 1</Text>
        <Text>Paragraph 2</Text>
        <Box gap={8}>
          <AsyncButton
            disabled={isAuthenticated}
            onClick={signInAsGuest}
            reason={isAuthenticated ? "alreadyLoggedIn" : undefined}
            translations={t.login.signInAnonymously}
          />
          <AsyncButton
            disabled={isAuthenticated}
            onClick={signInWithGoogle}
            reason={isAuthenticated ? "alreadyLoggedIn" : undefined}
            translations={t.login.signInWithGoogle}
          />
        </Box>
      </PageContent>
    </PageLayout>
  )
}
