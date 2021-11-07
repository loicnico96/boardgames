import styled from "@emotion/styled"

import { getCardAction, getCardPriority } from "lib/games/roborally/card"

export type CardProps = {
  card: number | null
  disabled?: boolean
  onClick?: () => void
}

const StyledCard = styled.div<CardProps>`
  align-items: center;
  background-color: lightgray;
  border: 1px solid black;
  border-radius: 12px;
  cursor: ${props =>
    props.disabled
      ? "not-allowed"
      : props.onClick
      ? "pointer"
      : props.title
      ? "help"
      : "default"};
  display: flex;
  height: 90px;
  justify-content: center;
  text-align: center;
  width: 60px;
`

export function Card({ card, disabled, onClick }: CardProps) {
  const label =
    card !== null ? `${getCardAction(card)} (${getCardPriority(card)})` : ""

  return (
    <StyledCard
      card={card}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      title={label}
    >
      {label}
    </StyledCard>
  )
}
