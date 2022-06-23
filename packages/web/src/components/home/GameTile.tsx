import { Text } from "@boardgames/components"
import styled from "@emotion/styled"
import Image from "next/image"

import { RouterLink } from "components/ui/RouterLink"
import { useTranslations } from "hooks/useTranslations"
import { GameType } from "lib/games/types"
import { getGameAsset } from "lib/utils/assets"
import { ROUTES } from "lib/utils/navigation"

export type GameTileProps = {
  game: GameType
}

const GameTileContainer = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.secondary};
  border: 8px solid ${props => props.theme.colors.primary};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  height: 288px;
  padding: 16px 24px;
  width: 288px;
`

const GameTileImage = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`

export function GameTile({ game }: GameTileProps) {
  const t = useTranslations()

  const label = t.games[game].name
  const tooltip = t.replace(t.home.gameTile.tooltip, { game: label })
  const src = getGameAsset(game, "home.jpg")

  return (
    <RouterLink href={ROUTES.roomList(game)} title={tooltip}>
      <GameTileContainer>
        <GameTileImage>
          <Image alt={label} layout="fill" objectFit="contain" src={src} />
        </GameTileImage>
      </GameTileContainer>
      <Text alignment="center">{label}</Text>
    </RouterLink>
  )
}
