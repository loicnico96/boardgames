/* eslint-disable no-alert */

import { TranslationConfig } from "config/translations/useTranslations"

export function promptUserName(
  t: TranslationConfig,
  oldName?: string
): string | null {
  const userName = window.prompt(t.userProfile.userName.label, oldName)?.trim()

  if (userName === undefined) {
    return null
  }

  if (userName === "") {
    throw Error(t.userProfile.userName.reason.empty)
  }

  return userName
}
