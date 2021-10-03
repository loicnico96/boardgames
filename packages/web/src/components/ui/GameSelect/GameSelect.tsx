import { computeStyleProps, StyleProps } from "@boardgames/components"
import { useCallback } from "react"

import { useTranslations } from "hooks/useTranslations"
import { GameType, isGameType } from "lib/games/types"

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export type GameSelectProps = Omit<SelectProps, "onChange" | "value"> & {
  onChange: (value: GameType | null) => void
  value: GameType | null
} & StyleProps

const VALUE_ALL = "allGames"

export function GameSelect(props: GameSelectProps) {
  const { onChange, value, ...selectProps } = computeStyleProps(props)

  const t = useTranslations()

  const onSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(isGameType(e.target.value) ? e.target.value : null)
    },
    [onChange]
  )

  return (
    <select {...selectProps} onChange={onSelect} value={value ?? VALUE_ALL}>
      <option key={VALUE_ALL} value={VALUE_ALL}>
        {t.roomList.allGames}
      </option>
      {Object.values(GameType).map(game => (
        <option key={game} value={game}>
          {t.games[game].name}
        </option>
      ))}
    </select>
  )
}
