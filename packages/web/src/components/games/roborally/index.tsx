import { Text } from "@boardgames/components"

import { useTranslations } from "hooks/useTranslations"

export default function Roborally() {
  const t = useTranslations()
  return <Text>{t.games.roborally.name}</Text>
}
