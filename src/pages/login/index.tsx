import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

import PageContainer from "components/layout/PageContainer"
import PageContent from "components/layout/PageContent"
import PageHeader from "components/layout/PageHeader"
import AuthPersistence from "components/login/AuthPersistence"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import Button from "components/ui/Button"
import { useActions } from "hooks/store/useActions"
import { useAuth } from "hooks/store/useAuth"
import { useTranslations } from "hooks/useTranslations"
import { ROUTES } from "lib/utils/navigation"
import { getSearchParams } from "lib/utils/search"

const CALLBACK_URL_PARAM = "callback"
const DEFAULT_PERSISTENCE = false

export default function LoginPage() {
  const { signInAnonymously, signInWithGoogle } = useActions()
  const { user } = useAuth()

  const isAuthenticated = user !== null
  const router = useRouter()
  const t = useTranslations()

  const parents: BreadcrumbsParent[] = [
    {
      path: ROUTES.home(),
      title: t.home.pageTitle,
    },
  ]

  const [persistence, setPersistence] = useState(DEFAULT_PERSISTENCE)

  useEffect(() => {
    if (isAuthenticated) {
      const callbackUrl = getSearchParams().get(CALLBACK_URL_PARAM)
      router.push(callbackUrl ?? ROUTES.home())
    }
  }, [isAuthenticated, router])

  return (
    <PageContainer>
      <PageHeader parents={parents} title={t.login.pageTitle} />
      <PageContent>
        <div>
          <Button
            disabled={isAuthenticated}
            onClick={() => signInAnonymously(persistence)}
            title={t.login.signInAnonymously}
          >
            {t.login.signInAnonymously}
          </Button>
          <Button
            disabled={isAuthenticated}
            onClick={() => signInWithGoogle(persistence)}
            title={t.login.signInWithGoogle}
          >
            {t.login.signInWithGoogle}
          </Button>
        </div>
        <AuthPersistence
          disabled={isAuthenticated}
          onChange={setPersistence}
          value={persistence}
        />
      </PageContent>
    </PageContainer>
  )
}
