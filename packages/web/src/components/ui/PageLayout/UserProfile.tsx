import { Box, Spinner, UserAvatar, UserInfo } from "@boardgames/components"

import { AsyncButton } from "components/ui/AsyncButton"
import { useTranslations } from "hooks/useTranslations"
import { useAuthContext } from "lib/auth/context"
import { promptUserName } from "lib/auth/promptUserName"

import { Tooltip } from "../Tooltip"

import { LoginLink } from "./LoginLink"

export function UserProfile() {
  const t = useTranslations()

  const { isLoading, signOut, updateUserProfile, user } = useAuthContext()

  if (isLoading) {
    return <Spinner size={40} />
  }

  if (user === null) {
    return <LoginLink />
  }

  return (
    <Box gap={8}>
      <Tooltip position="bottom" text={t.userProfile.userName.tooltip}>
        <UserInfo
          onClick={async () => {
            const oldName = user.userInfo.userName
            const newName = promptUserName(t, oldName)
            if (newName !== null && newName !== oldName) {
              await updateUserProfile({ userName: newName })
            }
          }}
          userName={
            user.userInfo.userName ?? t.userProfile.userName.defaultValue
          }
        />
      </Tooltip>
      {user.userInfo.imageUrl && (
        <UserAvatar imageUrl={user.userInfo.imageUrl} size={40} />
      )}
      <AsyncButton onClick={signOut} translations={t.userProfile.signOut} />
    </Box>
  )
}
