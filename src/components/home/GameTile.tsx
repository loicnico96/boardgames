import styled from "@emotion/styled"
import HomeImageMetropolys from "assets/metropolys/home.jpg"
import HomeImageRoborally from "assets/roborally/home.jpg"
import Image from "next/image"

import Box from "components/ui/Box"
import Link from "components/ui/Link"
import { useTranslations } from "hooks/useTranslations"
import { GameType } from "lib/games/GameType"
import { ROUTES } from "lib/utils/navigation"
import { withSearchParams } from "lib/utils/search"

export type GameTileProps = {
  game: GameType
}

const GAME_TILE_IMAGES = {
  // TODO: Find picture
  [GameType.MAJESTY]: HomeImageMetropolys,
  [GameType.METROPOLYS]: HomeImageMetropolys,
  [GameType.ROBORALLY]: HomeImageRoborally,
}

const GameTileContainer = styled(Box)`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 300px;
  justify-content: center;
  width: 300px;
`

const ImageContainer = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`

const GameTileLabel = styled.div`
  font-size: 1.5em;
  padding-top: 0.5em;
  text-align: center;
`

const GameTile = ({ game }: GameTileProps) => {
  const linkTo = withSearchParams(ROUTES.roomList(), { game })
  const t = useTranslations()

  return (
    <Link href={linkTo} title={t.home.gameTile.tooltip}>
      <GameTileContainer>
        <ImageContainer>
          <Image
            alt={t.games[game].name}
            layout="fill"
            objectFit="contain"
            src={GAME_TILE_IMAGES[game]}
          />
        </ImageContainer>
      </GameTileContainer>
      <GameTileLabel>{t.games[game].name}</GameTileLabel>
    </Link>
  )
}

export default GameTile
