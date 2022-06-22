import { Text } from "@boardgames/components"
import styled from "@emotion/styled"
import Image from "next/image"

import { RouterLink } from "components/ui/RouterLink"
import { useTranslations } from "hooks/useTranslations"
import { GameType } from "lib/games/types"
import {
  getAsset,
  RouteParam,
  ROUTES,
  withSearchParams,
} from "lib/utils/navigation"

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

  const url = withSearchParams(ROUTES.roomList(), {
    [RouteParam.GAME_TYPE]: game,
  })

  const label = t.games[game].name
  const tooltip = t.replace(t.home.gameTile.tooltip, { game: label })
  const src = getAsset(`games/${game}/home.jpg`)

  return (
    <RouterLink href={url} title={tooltip}>
      <GameTileContainer>
        <GameTileImage>
          <Image alt={label} layout="fill" objectFit="contain" src={src} />
        </GameTileImage>
      </GameTileContainer>
      <Text alignment="center">{label}</Text>
    </RouterLink>
  )
}
