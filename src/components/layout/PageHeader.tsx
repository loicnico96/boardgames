import { useRouter } from "next/router"
import React, { useCallback } from "react"

import Breadcrumbs, { BreadcrumbsProps } from "components/ui/Breadcrumbs"
import Button from "components/ui/Button"
import Link from "components/ui/Link"
import { useActions } from "hooks/store/useActions"
import { useAuth } from "hooks/store/useAuth"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { useTranslations } from "hooks/useTranslations"
import { promptUserName } from "lib/auth/promptUserName"
import { ROUTES } from "lib/utils/navigation"
import { withSearchParams } from "lib/utils/search"

import PageHead from "./PageHead"

export type PageHeaderProps = BreadcrumbsProps

export default function PageHeader({ parents, title }: PageHeaderProps) {
  const { asPath } = useRouter()
  const { setUserName, signOut } = useActions()
  const { user } = useAuth()

  const loginUrl = withSearchParams(ROUTES.login(), { callback: asPath })

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
      <PageHead title={title} />
      <div className="Breadcrumbs">
        <Breadcrumbs parents={parents} title={title} />
      </div>
      {user && (
        <div
          className="UserName"
          onClick={changeUserNameAsync}
          title={t.login.setUserName}
        >
          {user.userInfo.userName}
        </div>
      )}
      {user ? (
        <Button onClick={signOut} height={32}>
          {t.login.signOut}
        </Button>
      ) : (
        <Link href={loginUrl}>{t.login.signIn}</Link>
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
      `}</style>
    </div>
  )
}
