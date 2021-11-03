import Image from "next/image"

import ImageForestBeans1 from "assets/games/cacao/tiles/beans1.jpg"
import ImageForestBeans2 from "assets/games/cacao/tiles/beans2.jpg"
import ImageForestGold1 from "assets/games/cacao/tiles/gold1.jpg"
import ImageForestGold2 from "assets/games/cacao/tiles/gold2.jpg"
import ImageForestKitchen from "assets/games/cacao/tiles/kitchen.jpg"
import ImageForestMarket2 from "assets/games/cacao/tiles/market2.jpg"
import ImageForestMarket3 from "assets/games/cacao/tiles/market3.jpg"
import ImageForestMarket3Chocolate from "assets/games/cacao/tiles/market3_chocolate.jpg"
import ImageForestMarket4 from "assets/games/cacao/tiles/market4.jpg"
import ImageForestMarket5 from "assets/games/cacao/tiles/market5.jpg"
import ImageForestSun from "assets/games/cacao/tiles/sun.jpg"
import ImageForestTemple6 from "assets/games/cacao/tiles/temple6.jpg"
import ImageForestTemple8 from "assets/games/cacao/tiles/temple8.jpg"
import ImageForestTree from "assets/games/cacao/tiles/tree.jpg"
import ImageForestWater from "assets/games/cacao/tiles/water.jpg"
import { Tooltip } from "components/ui/Tooltip"
import { useTranslations } from "hooks/useTranslations"
import { ForestType } from "lib/games/cacao/model"

import { BasicTile } from "./BasicTile"

export type ForestTileProps = {
  disabled?: boolean
  onClick?: () => void
  selected?: boolean
  type: ForestType
}

export const ForestImageSources = {
  [ForestType.CACAO_1]: ImageForestBeans1,
  [ForestType.CACAO_2]: ImageForestBeans2,
  [ForestType.GOLD_1]: ImageForestGold1,
  [ForestType.GOLD_2]: ImageForestGold2,
  [ForestType.KITCHEN]: ImageForestKitchen,
  [ForestType.MARKET_2]: ImageForestMarket2,
  [ForestType.MARKET_3]: ImageForestMarket3,
  [ForestType.MARKET_3_CHOCOLATE]: ImageForestMarket3Chocolate,
  [ForestType.MARKET_4]: ImageForestMarket4,
  [ForestType.MARKET_5]: ImageForestMarket5,
  [ForestType.SUN_DISK]: ImageForestSun,
  [ForestType.TEMPLE_6]: ImageForestTemple6,
  [ForestType.TEMPLE_8]: ImageForestTemple8,
  [ForestType.TREE]: ImageForestTree,
  [ForestType.WATER]: ImageForestWater,
}

export function ForestTile({ type, ...props }: ForestTileProps) {
  const t = useTranslations()

  const tooltip = [
    t.games.cacao.forest[type].label,
    t.games.cacao.forest[type].description,
  ].join(" - ")

  return (
    <Tooltip text={tooltip}>
      <BasicTile {...props}>
        <Image
          aria-label={t.games.cacao.forest[type].label}
          placeholder="blur"
          src={ForestImageSources[type]}
        />
      </BasicTile>
    </Tooltip>
  )
}
