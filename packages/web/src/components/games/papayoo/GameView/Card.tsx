// Spades
import css from "@emotion/css"
import styled from "@emotion/styled"
import CardSpade1 from "assets/games/papayoo/cards/card101.png"
import CardSpade2 from "assets/games/papayoo/cards/card102.png"
import CardSpade3 from "assets/games/papayoo/cards/card103.png"
import CardSpade4 from "assets/games/papayoo/cards/card104.png"
import CardSpade5 from "assets/games/papayoo/cards/card105.png"
import CardSpade6 from "assets/games/papayoo/cards/card106.png"
import CardSpade7 from "assets/games/papayoo/cards/card107.png"
import CardSpade8 from "assets/games/papayoo/cards/card108.png"
import CardSpade9 from "assets/games/papayoo/cards/card109.png"
import CardSpade10 from "assets/games/papayoo/cards/card110.png"
// Hearts
import CardHeart1 from "assets/games/papayoo/cards/card201.png"
import CardHeart2 from "assets/games/papayoo/cards/card202.png"
import CardHeart3 from "assets/games/papayoo/cards/card203.png"
import CardHeart4 from "assets/games/papayoo/cards/card204.png"
import CardHeart5 from "assets/games/papayoo/cards/card205.png"
import CardHeart6 from "assets/games/papayoo/cards/card206.png"
import CardHeart7 from "assets/games/papayoo/cards/card207.png"
import CardHeart8 from "assets/games/papayoo/cards/card208.png"
import CardHeart9 from "assets/games/papayoo/cards/card209.png"
import CardHeart10 from "assets/games/papayoo/cards/card210.png"
// Clubs
import CardClub1 from "assets/games/papayoo/cards/card301.png"
import CardClub2 from "assets/games/papayoo/cards/card302.png"
import CardClub3 from "assets/games/papayoo/cards/card303.png"
import CardClub4 from "assets/games/papayoo/cards/card304.png"
import CardClub5 from "assets/games/papayoo/cards/card305.png"
import CardClub6 from "assets/games/papayoo/cards/card306.png"
import CardClub7 from "assets/games/papayoo/cards/card307.png"
import CardClub8 from "assets/games/papayoo/cards/card308.png"
import CardClub9 from "assets/games/papayoo/cards/card309.png"
import CardClub10 from "assets/games/papayoo/cards/card310.png"
// Diamonds
import CardDiamond1 from "assets/games/papayoo/cards/card401.png"
import CardDiamond2 from "assets/games/papayoo/cards/card402.png"
import CardDiamond3 from "assets/games/papayoo/cards/card403.png"
import CardDiamond4 from "assets/games/papayoo/cards/card404.png"
import CardDiamond5 from "assets/games/papayoo/cards/card405.png"
import CardDiamond6 from "assets/games/papayoo/cards/card406.png"
import CardDiamond7 from "assets/games/papayoo/cards/card407.png"
import CardDiamond8 from "assets/games/papayoo/cards/card408.png"
import CardDiamond9 from "assets/games/papayoo/cards/card409.png"
import CardDiamond10 from "assets/games/papayoo/cards/card410.png"
// Payoos
import CardBlack1 from "assets/games/papayoo/cards/card501.png"
import CardBlack2 from "assets/games/papayoo/cards/card502.png"
import CardBlack3 from "assets/games/papayoo/cards/card503.png"
import CardBlack4 from "assets/games/papayoo/cards/card504.png"
import CardBlack5 from "assets/games/papayoo/cards/card505.png"
import CardBlack6 from "assets/games/papayoo/cards/card506.png"
import CardBlack7 from "assets/games/papayoo/cards/card507.png"
import CardBlack8 from "assets/games/papayoo/cards/card508.png"
import CardBlack9 from "assets/games/papayoo/cards/card509.png"
import CardBlack10 from "assets/games/papayoo/cards/card510.png"
import CardBlack11 from "assets/games/papayoo/cards/card511.png"
import CardBlack12 from "assets/games/papayoo/cards/card512.png"
import CardBlack13 from "assets/games/papayoo/cards/card513.png"
import CardBlack14 from "assets/games/papayoo/cards/card514.png"
import CardBlack15 from "assets/games/papayoo/cards/card515.png"
import CardBlack16 from "assets/games/papayoo/cards/card516.png"
import CardBlack17 from "assets/games/papayoo/cards/card517.png"
import CardBlack18 from "assets/games/papayoo/cards/card518.png"
import CardBlack19 from "assets/games/papayoo/cards/card519.png"
import CardBlack20 from "assets/games/papayoo/cards/card520.png"
// Empty
import CardEmpty from "assets/games/papayoo/cards/empty.png"
import Image from "next/image"
import { useCallback } from "react"

import { Tooltip } from "components/ui/Tooltip"
import { replace } from "config/translations/replace"
import { useAsyncHandler } from "hooks/useAsyncHandler"
import { useTranslations } from "hooks/useTranslations"
import {
  getCardColor,
  getCardScore,
  getCardValue,
} from "lib/games/papayoo/cards"

export type CardVariant = "default" | "highlight" | "invalid" | "valid"

export type CardProps = {
  card: number | null
  disabled?: boolean
  onClick?: (card: number) => unknown
  tooltip?: string
  variant?: CardVariant
}

type CardImageProps = {
  disabled?: boolean
  onClick?: () => unknown
  variant: CardVariant
}

export const CardImageSources = [
  // Payoos
  CardBlack1,
  CardBlack2,
  CardBlack3,
  CardBlack4,
  CardBlack5,
  CardBlack6,
  CardBlack7,
  CardBlack8,
  CardBlack9,
  CardBlack10,
  CardBlack11,
  CardBlack12,
  CardBlack13,
  CardBlack14,
  CardBlack15,
  CardBlack16,
  CardBlack17,
  CardBlack18,
  CardBlack19,
  CardBlack20,
  // Spades
  CardSpade1,
  CardSpade2,
  CardSpade3,
  CardSpade4,
  CardSpade5,
  CardSpade6,
  CardSpade7,
  CardSpade8,
  CardSpade9,
  CardSpade10,
  // Hearts
  CardHeart1,
  CardHeart2,
  CardHeart3,
  CardHeart4,
  CardHeart5,
  CardHeart6,
  CardHeart7,
  CardHeart8,
  CardHeart9,
  CardHeart10,
  // Clubs
  CardClub1,
  CardClub2,
  CardClub3,
  CardClub4,
  CardClub5,
  CardClub6,
  CardClub7,
  CardClub8,
  CardClub9,
  CardClub10,
  // Diamonds
  CardDiamond1,
  CardDiamond2,
  CardDiamond3,
  CardDiamond4,
  CardDiamond5,
  CardDiamond6,
  CardDiamond7,
  CardDiamond8,
  CardDiamond9,
  CardDiamond10,
  // Empty
  CardEmpty,
]

const VARIANTS: Record<CardVariant, string> = {
  default: "gray",
  highlight: "yellow",
  invalid: "red",
  valid: "green",
}

const StyledImageContainer = styled.div<CardImageProps>`
  box-shadow: 0px 0px 4px 2px ${props => VARIANTS[props.variant]};
  border-radius: 8px;
  height: 120px;
  margin: 8px;
  transition-duration: 0.2s;
  width: 80px;

  ${props =>
    props.onClick
      ? css`
          cursor: ${props.disabled ? "not-allowed" : "pointer"};
          &:hover {
            margin-bottom: ${props.disabled ? 12 : 16}px;
            margin-top: ${props.disabled ? 4 : 0}px;
          }
        `
      : ""}
`

export function Card({
  card,
  disabled,
  onClick,
  tooltip,
  variant = "default",
}: CardProps) {
  const [onClickAsync, loading] = useAsyncHandler(
    useCallback(async () => {
      if (card !== null && onClick && !disabled) {
        await onClick(card)
      }
    }, [card, disabled, onClick])
  )

  const t = useTranslations()

  const cardLabel =
    card === null
      ? t.games.papayoo.card.empty
      : replace(t.games.papayoo.card.label, {
          color: t.games.papayoo.color[getCardColor(card)],
          score: getCardScore(card),
          value: getCardValue(card),
        })

  const cardTooltip =
    card === null
      ? tooltip
      : replace(tooltip ?? t.games.papayoo.card.tooltip, {
          color: t.games.papayoo.color[getCardColor(card)],
          score: getCardScore(card),
          value: getCardValue(card),
        })

  return (
    <Tooltip text={cardTooltip}>
      <StyledImageContainer
        aria-disabled={disabled ?? loading}
        disabled={disabled ?? loading}
        onClick={onClick ? onClickAsync : undefined}
        role="button"
        variant={variant}
      >
        <Image
          aria-label={cardLabel}
          placeholder="blur"
          src={card === null ? CardEmpty : CardImageSources[card]}
        />
      </StyledImageContainer>
    </Tooltip>
  )
}
