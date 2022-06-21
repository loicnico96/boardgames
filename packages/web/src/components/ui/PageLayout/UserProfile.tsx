import { Box, Spinner, UserInfo } from "@boardgames/components"
import { toast } from "react-toastify"

import { AsyncButton } from "components/ui/AsyncButton"
import { useTranslations } from "hooks/useTranslations"

import { LoginLink } from "./LoginLink"

export function UserProfile() {
  const t = useTranslations()

  // TODO
  const isLoading = false
  const user = null

  if (isLoading) {
    return <Spinner size={28} />
  }

  if (user === null) {
    return <LoginLink />
  }

  return (
    <Box gap={8}>
      <UserInfo
        title="Tooltip" // TOOD: {t.userProfile.userName.tooltip}
        userName="Username" // TODO: {user.userInfo.userName ?? t.userProfile.userName.defaultValue}
      />
      <AsyncButton
        onClick={() => toast.success("signed out!")}
        translations={t.userProfile.signOut}
      />
    </Box>
  )
}
