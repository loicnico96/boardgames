import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

import { useActions } from "hooks/store/useActions"
import { useAuth } from "hooks/store/useAuth"
import { ROUTES } from "lib/utils/navigation"
import { withSearchParams } from "lib/utils/search"

import AsyncButton from "./AsyncButton"

export type PageHeaderProps = {
  title: string
}

export default function PageHeader({ title }: PageHeaderProps) {
  const { pathname } = useRouter()
  const { signOut } = useActions()
  const { user } = useAuth()

  const loginUrl = withSearchParams(ROUTES.login(), { callback: pathname })

  return (
    <div className="PageHeader">
      <div className="Breadcrumbs">{title}</div>
      {user !== null ? (
        <>
          <div>{user.userInfo.userName}</div>
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
      `}</style>
    </div>
  )
}
