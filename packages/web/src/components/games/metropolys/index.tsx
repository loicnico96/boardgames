import { Text } from "@boardgames/components"

import { useTranslations } from "hooks/useTranslations"

export default function Metropolys() {
  const t = useTranslations()
  return <Text>{t.games.metropolys.name}</Text>
}
