import React from "react"
import styled from "styled-components"

import { useTranslations } from "hooks/useTranslations"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export type AuthPersistenceProps = Pick<InputProps, "disabled"> & {
  onChange: (value: boolean) => void
  value: boolean
}

const AuthPersistenceContainer = styled.div`
  align-items: center;
  display: flex;
  padding-top: 8px;
`

const AuthPersistenceCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 8px;
`

export default function AuthPersistence({
  disabled = false,
  onChange,
  value,
}: AuthPersistenceProps) {
  const t = useTranslations()

  return (
    <AuthPersistenceContainer>
      <AuthPersistenceCheckbox
        checked={value}
        disabled={disabled}
        name={t.login.rememberMe}
        onChange={e => onChange(e.target.checked)}
      />
      <span>{t.login.rememberMe}</span>
    </AuthPersistenceContainer>
  )
}
