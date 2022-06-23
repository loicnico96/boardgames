import { computeStyleProps, StyleProps } from "@boardgames/components"

import { useTranslations } from "hooks/useTranslations"
import { GameType, isGameType } from "lib/games/types"

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export type GameSelectProps = Omit<SelectProps, "onChange" | "value"> & {
  onChange: (value: GameType | null) => void
  value: GameType | null
} & StyleProps

const VALUE_ALL = "*"

export function GameSelect(props: GameSelectProps) {
  const { onChange, value, ...selectProps } = computeStyleProps(props)

  const t = useTranslations()

  return (
    <select
      {...selectProps}
      onChange={event => {
        onChange(isGameType(event.target.value) ? event.target.value : null)
      }}
      value={value ?? VALUE_ALL}
    >
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
