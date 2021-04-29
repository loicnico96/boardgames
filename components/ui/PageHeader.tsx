import Link from "next/link"
import { useRouter } from "next/router"
import React, { useCallback } from "react"

import { useActions } from "hooks/store/useActions"
import { useAuth } from "hooks/store/useAuth"
import { useAsyncHandler } from "hooks/useAsyncHandler"
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
      <div className="Breadcrumbs">{title}</div>
      {user ? (
        <>
          <div
            className="UserName"
            onClick={changeUserNameAsync}
            title="Click to change user name"
          >
            {user.userInfo.userName}
          </div>
          <AsyncButton onClick={signOut}>Sign out</AsyncButton>
        </>
      ) : (
        <Link href={loginUrl} as={loginUrl}>
          <a>Sign in</a>
        </Link>
      )}
      <style jsx>{`
        .PageHeader {
          align-items: center;
          background-color: #aaa;
          column-gap: 8px;
          display: flex;
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
