import { Box, Spinner, UserInfo } from "@boardgames/components"
import { useCallback } from "react"

import { AsyncButton } from "components/ui/AsyncButton"
import { useTranslations } from "config/translations/useTranslations"
import { useActions } from "hooks/store/useActions"
import { useAuth } from "hooks/store/useAuth"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { promptUserName } from "lib/auth/promptUserName"
import { changeUserName, signOut } from "lib/firebase/auth"

import { LoginLink } from "./LoginLink"

export function UserProfile() {
  const { loading, user } = useAuth()
  const { setUserName } = useActions()
  const t = useTranslations()

  const [onClick] = useAsyncHandler(
    useCallback(async () => {
      if (user !== null) {
        const oldName = user.userInfo.userName
        const newName = promptUserName(t, oldName ?? undefined)
        if (newName !== null && newName !== oldName) {
          await changeUserName(newName)
          setUserName(newName)
        }
      }
    }, [setUserName, t, user])
  )

  if (loading) {
    return <Spinner size={28} />
  }

  if (!user) {
    return <LoginLink />
  }

  return (
    <Box gap={8}>
      <UserInfo
        onClick={onClick}
        title={t.userProfile.userName.tooltip}
        userName={user.userInfo.userName ?? t.userProfile.userName.defaultValue}
      />
      <AsyncButton onClick={signOut} translations={t.userProfile.signOut} />
    </Box>
  )
}
