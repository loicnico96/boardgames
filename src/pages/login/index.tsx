import { useRouter } from "next/router"
import React, { useCallback, useEffect, useState } from "react"

import PageContainer from "components/layout/PageContainer"
import PageContent from "components/layout/PageContent"
import PageHeader from "components/layout/PageHeader"
import AuthPersistence from "components/login/AuthPersistence"
import { BreadcrumbsParent } from "components/ui/Breadcrumbs"
import Button from "components/ui/Button"
import { useActions } from "hooks/store/useActions"
import { useAuth } from "hooks/store/useAuth"
import { useTranslations } from "hooks/useTranslations"
import { promptUserName } from "lib/auth/promptUserName"
import { signInAnonymously, signInWithGoogle } from "lib/firebase/auth"
import { handleGenericError } from "lib/utils/error"
import { ROUTES } from "lib/utils/navigation"
import { getSearchParams } from "lib/utils/search"

const CALLBACK_PARAM = "callback"
const DEFAULT_PERSISTENCE = false

export default function LoginPage() {
  const { setUserName } = useActions()
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
      const callbackUrl = getSearchParams(router).get(CALLBACK_PARAM)
      router.push(callbackUrl ?? ROUTES.home()).catch(handleGenericError)
    }
  }, [isAuthenticated, router])

  const guestSignIn = useCallback(async () => {
    const userName = promptUserName()
    if (userName) {
      await signInAnonymously(persistence)
      await setUserName(userName)
    } else {
      throw Error("Username must not be empty")
    }
  }, [persistence, setUserName])

  const googleSignIn = useCallback(async () => {
    await signInWithGoogle(persistence)
  }, [persistence])

  return (
    <PageContainer>
      <PageHeader parents={parents} title={t.login.pageTitle} />
      <PageContent>
        <div>
          <Button
            disabled={isAuthenticated}
            onClick={guestSignIn}
            translations={t.login.signInAnonymously}
          />
          <Button
            disabled={isAuthenticated}
            onClick={googleSignIn}
            translations={t.login.signInWithGoogle}
          />
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
