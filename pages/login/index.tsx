import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

import AsyncButton from "components/ui/AsyncButton"
import PageContainer from "components/ui/PageContainer"
import PageContent from "components/ui/PageContent"
import PageHeader from "components/ui/PageHeader"
import { useActions } from "hooks/store/useActions"
import { useAuth } from "hooks/store/useAuth"
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

  const [persistence, setPersistence] = useState(DEFAULT_PERSISTENCE)

  useEffect(() => {
    if (isAuthenticated) {
      const callbackUrl = getSearchParams().get(CALLBACK_URL_KEY)
      router.push(callbackUrl ?? DEFAULT_CALLBACK_URL)
    }
  }, [isAuthenticated, router])

  return (
    <PageContainer>
      <PageHeader title="Login" />
      <PageContent>
        <div>
          <AsyncButton
            disabled={isAuthenticated}
            onClick={() => signInAnonymously(persistence)}
            title="Sign in as guest"
          >
            Sign in as guest
          </AsyncButton>
          <AsyncButton
            disabled={isAuthenticated}
            onClick={() => signInWithGoogle(persistence)}
            title="Sign in with Google"
          >
            Sign in with Google
          </AsyncButton>
        </div>
        <div className="AuthPersistence">
          <input
            checked={persistence}
            disabled={isAuthenticated}
            name="Remember me"
            onChange={() => setPersistence(!persistence)}
            type="checkbox"
          />
          <span>Remember me</span>
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
      </PageContent>
    </PageContainer>
  )
}
