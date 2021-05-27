import React, { useCallback } from "react"

import { useActions } from "hooks/store/useActions"
import { useAuth } from "hooks/store/useAuth"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { useTranslations } from "hooks/useTranslations"
import { promptUserName } from "lib/auth/promptUserName"

export default function UserInfo() {
  const { setUserName } = useActions()
  const { user } = useAuth()

  const t = useTranslations()

  const changeUserName = useCallback(async () => {
    if (user !== null) {
      const oldName = user.userInfo.userName ?? undefined
      const newName = await promptUserName(oldName)
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
    <div onClick={changeUserNameAsync} title={t.login.setUserName}>
      {user.userInfo.userName ?? "..."}
      <style jsx>{`
        div {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
