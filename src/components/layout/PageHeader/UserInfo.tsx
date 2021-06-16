import styled from "@emotion/styled"
import { useCallback } from "react"

import { useActions } from "hooks/store/useActions"
import { useAuth } from "hooks/store/useAuth"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { useTranslations } from "hooks/useTranslations"
import { promptUserName } from "lib/auth/promptUserName"

const UserInfoContainer = styled.div`
  cursor: pointer;
`

export default function UserInfo() {
  const { setUserName } = useActions()
  const { user } = useAuth()

  const t = useTranslations()

  const changeUserName = useCallback(async () => {
    if (user !== null) {
      const oldName = user.userInfo.userName ?? undefined
      const newName = promptUserName(oldName)
      if (newName && newName !== oldName) {
        await setUserName(newName)
      }
    }
  }, [setUserName, user])

  const [changeUserNameAsync] = useAsyncHandler(changeUserName)

  if (!user) {
    return null
  }

  return (
    <UserInfoContainer
      onClick={changeUserNameAsync}
      title={t.login.setUserName}
    >
      {user.userInfo.userName ?? "..."}
    </UserInfoContainer>
  )
}
