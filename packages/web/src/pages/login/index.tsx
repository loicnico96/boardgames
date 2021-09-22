import { Headline, Text, PageContent, Box } from "@boardgames/components"
import { useCallback } from "react"

import { AsyncButton } from "components/ui/AsyncButton"
import { PageLayout } from "components/ui/PageLayout"
import { useTranslations } from "config/translations/useTranslations"
import { useActions } from "hooks/store/useActions"
import { useAuth } from "hooks/store/useAuth"
import { promptUserName } from "lib/auth/promptUserName"
import { signInAnonymously, signInWithGoogle } from "lib/firebase/auth"
import { ROUTES } from "lib/utils/navigation"

export default function LoginPage() {
  const t = useTranslations()

  const { setUserName } = useActions()
  const { user } = useAuth()

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
            disabled={user !== null}
            onClick={signInAsGuest}
            reason={user !== null ? "alreadyLoggedIn" : undefined}
            translations={t.login.signInAnonymously}
          />
          <AsyncButton
            disabled={user !== null}
            onClick={signInWithGoogle}
            reason={user !== null ? "alreadyLoggedIn" : undefined}
            translations={t.login.signInWithGoogle}
          />
        </Box>
      </PageContent>
    </PageLayout>
  )
}
