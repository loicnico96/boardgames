import { Text } from "@boardgames/components"
import MetropolysHome from "assets/games/metropolys/home.jpg"
import PapayooHome from "assets/games/papayoo/home.jpg"
import RoborallyHome from "assets/games/roborally/home.jpg"
import Image from "next/image"
import styled from "@emotion/styled"

import { RouterLink } from "components/ui/RouterLink"
import { withSearchParams } from "hooks/useSearchParams"
import { useTranslations } from "hooks/useTranslations"
import { GameType } from "lib/games/types"
import { Param, ROUTES } from "lib/utils/navigation"
import { replace } from "config/translations/replace"

export type GameTileProps = {
  game: GameType
}

export const GameImageSources = {
  metropolys: MetropolysHome,
  papayoo: PapayooHome,
  roborally: RoborallyHome,
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
    [Param.GAME_TYPE]: game,
  })

  const label = t.games[game].name
  const tooltip = replace(t.home.gameTile.tooltip, { game: label })

  return (
    <RouterLink href={url} title={tooltip}>
      <GameTileContainer>
        <GameTileImage>
          <Image
            alt={label}
            layout="fill"
            objectFit="contain"
            src={GameImageSources[game]}
          />
        </GameTileImage>
      </GameTileContainer>
      <Text alignment="center">{label}</Text>
    </RouterLink>
  )
}
