import React, { useCallback } from "react"

import { useTranslations } from "hooks/useTranslations"
import { GameType } from "lib/model/RoomData"
import { enumValues, isEnum } from "lib/utils/enums"

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export type GameSelectProps = Omit<SelectProps, "onChange" | "value"> & {
  onChange: (value: GameType | null) => void
  value: GameType | null
}

const VALUE_ALL = "allGames"

export default function GameSelect({
  onChange,
  value,
  ...selectProps
}: GameSelectProps) {
  const t = useTranslations()

  const onSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(isEnum(e.target.value, GameType) ? e.target.value : null)
    },
    [onChange]
  )

  return (
    <select {...selectProps} onChange={onSelect} value={value ?? VALUE_ALL}>
      <option key={VALUE_ALL} value={VALUE_ALL}>
        {t.roomList.allGames}
      </option>
      {enumValues(GameType).map(game => (
        <option key={game} value={game}>
          {game /* t.games[game].name */}
        </option>
      ))}
    </select>
  )
}
