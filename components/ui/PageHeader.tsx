import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useCallback } from "react"

import { useActions } from "hooks/store/useActions"
import { useAuth } from "hooks/store/useAuth"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { useTranslations } from "hooks/useTranslations"
import { promptUserName } from "lib/auth/promptUserName"
import { ROUTES } from "lib/utils/navigation"
import { withSearchParams } from "lib/utils/search"

import AsyncButton from "./AsyncButton"

export type PageHeaderProps = {
  title: string
}

export default function PageHeader({ title }: PageHeaderProps) {
  const { pathname } = useRouter()
  const { setUserName, signOut } = useActions()
  const { user } = useAuth()

  const loginUrl = withSearchParams(ROUTES.login(), { callback: pathname })

  const t = useTranslations()

  const changeUserName = useCallback(async () => {
    if (user !== null) {
      const oldName = user.userInfo.userName
      const newName = await promptUserName(oldName)
      if (newName && newName !== oldName) {
        await setUserName(newName)
      }
    }
  }, [setUserName, user])

  const [changeUserNameAsync] = useAsyncHandler(changeUserName)

  return (
    <div className="PageHeader">
      <Head>
        <title>{title}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <div className="Breadcrumbs">{title}</div>
      {user ? (
        <>
          <div
            className="UserName"
            onClick={changeUserNameAsync}
            title={t.login.setUserName}
          >
            {user.userInfo.userName}
          </div>
          <AsyncButton className="SignOut" onClick={signOut}>
            {t.login.signOut}
          </AsyncButton>
        </>
      ) : (
        <Link href={loginUrl} as={loginUrl}>
          <a>{t.login.signIn}</a>
        </Link>
      )}
      <style jsx>{`
        .PageHeader {
          align-items: center;
          background-color: #aaa;
          column-gap: 8px;
          display: flex;
          height: 64px;
          padding: 16px 48px;
        }

        .Breadcrumbs {
          flex: 1 1 auto;
        }

        .UserName {
          cursor: pointer;
        }

        :global(.SignOut) {
          height: 32px;
        }
      `}</style>
    </div>
  )
}
