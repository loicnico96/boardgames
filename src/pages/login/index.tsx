import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

import PageLayout from "components/layout/PageLayout"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import Button from "components/ui/Button"
import { useActions } from "hooks/store/useActions"
import { useAuth } from "hooks/store/useAuth"
import { useTranslations } from "hooks/useTranslations"
import { ROUTES } from "lib/utils/navigation"
import { getSearchParams } from "lib/utils/search"

const CALLBACK_URL_KEY = "callback"
const DEFAULT_CALLBACK_URL = ROUTES.home()
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
      const callbackUrl = getSearchParams().get(CALLBACK_URL_KEY)
      router.push(callbackUrl ?? DEFAULT_CALLBACK_URL)
    }
  }, [isAuthenticated, router])

  return (
    <PageLayout parents={parents} title={t.login.pageTitle}>
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
      <div className="AuthPersistence">
        <input
          checked={persistence}
          disabled={isAuthenticated}
          name={t.login.rememberMe}
          onChange={() => setPersistence(!persistence)}
          type="checkbox"
        />
        <span>{t.login.rememberMe}</span>
      </div>
      <style jsx>
        {`
          .AuthPersistence {
            align-items: center;
            display: flex;
            padding-top: 8px;
          }

          .AuthPersistence > input {
            margin-right: 8px;
          }
        `}
      </style>
    </PageLayout>
  )
}
