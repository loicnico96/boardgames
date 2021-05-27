import React from "react"

import Breadcrumbs, { BreadcrumbsProps } from "components/ui/Breadcrumbs"
import Button from "components/ui/Button"
import Link from "components/ui/Link"
import { useAuth } from "hooks/store/useAuth"
import { useLocation } from "hooks/useLocation"
import { useTranslations } from "hooks/useTranslations"
import { signOut } from "lib/firebase/auth"
import { ROUTES } from "lib/utils/navigation"
import { withSearchParams } from "lib/utils/search"

import PageHead from "./PageHead"
import UserInfo from "./UserInfo"

export type PageHeaderProps = BreadcrumbsProps

export default function PageHeader({ parents, title }: PageHeaderProps) {
  const location = useLocation()
  const { user } = useAuth()

  const loginUrl = withSearchParams(ROUTES.login(), { callback: location })

  const t = useTranslations()

  return (
    <div>
      <PageHead title={title} />
      <Breadcrumbs parents={parents} title={title} />
      <UserInfo />
      {user ? (
        <Button onClick={signOut} height={32}>
          {t.login.signOut}
        </Button>
      ) : (
        <Link href={loginUrl}>{t.login.signIn}</Link>
      )}
      <style jsx>{`
        div {
          align-items: center;
          background-color: #aaa;
          column-gap: 8px;
          display: flex;
          height: 64px;
          padding: 16px 48px;
        }
      `}</style>
    </div>
  )
}
