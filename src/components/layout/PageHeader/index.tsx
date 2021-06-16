import styled from "@emotion/styled"

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

const PageHeaderContainer = styled.div`
  align-items: center;
  background-color: #aaa;
  column-gap: 8px;
  display: flex;
  height: 64px;
  padding: 16px 48px;

  > button {
    height: 32px;
  }
`

const BreadcrumbContainer = styled.div`
  flex: 1 1 auto;
`

export default function PageHeader({ parents, title }: PageHeaderProps) {
  const location = useLocation()
  const { user } = useAuth()

  const loginUrl = withSearchParams(ROUTES.login(), { callback: location })

  const t = useTranslations()

  return (
    <PageHeaderContainer>
      <PageHead title={title} />
      <BreadcrumbContainer>
        <Breadcrumbs parents={parents} title={title} />
      </BreadcrumbContainer>
      <UserInfo />
      {user ? (
        <Button onClick={signOut} translations={t.login.signOut} />
      ) : (
        <Link href={loginUrl}>{t.login.signIn}</Link>
      )}
    </PageHeaderContainer>
  )
}
