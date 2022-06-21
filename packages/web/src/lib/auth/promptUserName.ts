import { toast } from "react-toastify"

import { TranslationConfig } from "config/translations"

export function promptUserName(
  t: TranslationConfig,
  oldName?: string | null
): string | null {
  // eslint-disable-next-line no-alert
  const userName = window
    .prompt(t.userProfile.userName.label, oldName ?? undefined)
    ?.trim()

  if (userName === undefined) {
    return null
  }

  if (userName === "") {
    toast.error(t.userProfile.userName.reason.empty)
    return null
  }

  return userName
}
