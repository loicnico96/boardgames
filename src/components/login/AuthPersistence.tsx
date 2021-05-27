import React from "react"

import { useTranslations } from "hooks/useTranslations"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export type AuthPersistenceProps = Pick<InputProps, "disabled"> & {
  onChange: (value: boolean) => void
  value: boolean
}

export default function AuthPersistence({
  disabled = false,
  onChange,
  value,
}: AuthPersistenceProps) {
  const t = useTranslations()

  return (
    <div>
      <input
        checked={value}
        disabled={disabled}
        name={t.login.rememberMe}
        onChange={e => onChange(e.target.checked)}
        type="checkbox"
      />
      <span>{t.login.rememberMe}</span>
      <style jsx>{`
        div {
          align-items: center;
          display: flex;
          padding-top: 8px;
        }

        input {
          margin-right: 8px;
        }
      `}</style>
    </div>
  )
}
