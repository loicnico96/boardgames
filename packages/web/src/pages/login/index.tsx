import {
  Button,
  Headline,
  Text,
  PageContent,
  Box,
} from "@boardgames/components"

import { PageLayout } from "components/PageLayout"
import { useTranslations } from "config/translations/useTranslations"
import { useAuth } from "hooks/store/useAuth"
import { signInAnonymously, signInWithGoogle } from "lib/firebase/auth"
import { ROUTES } from "lib/utils/navigation"

export default function LoginPage() {
  const t = useTranslations()

  const { user } = useAuth()

  const parents = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  return (
    <PageLayout parents={parents} title={t.login.pageTitle}>
      <PageContent>
        <Headline>Title</Headline>
        <Text>Paragraph 1</Text>
        <Text>Paragraph 2</Text>
        <Box gap={8}>
          <Button
            disabled={user !== null}
            onClick={signInAnonymously}
            reason={user !== null ? "alreadyLoggedIn" : undefined}
            translations={t.login.signInAnonymously}
          />
          <Button
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
