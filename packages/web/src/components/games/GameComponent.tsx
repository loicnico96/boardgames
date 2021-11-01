import dynamic, { DynamicOptions } from "next/dynamic"
import { ComponentType } from "react"

import { GameType } from "lib/games/types"

import { GameComponentLoader } from "./GameComponentLoader"

const DYNAMIC_OPTIONS: DynamicOptions = {
  loading: GameComponentLoader,
  ssr: false,
}

export const GAME_COMPONENTS: Record<GameType, ComponentType> = {
  cacao: dynamic(
    () => import(/* webpackChunkName: "cacao" */ "./cacao"),
    DYNAMIC_OPTIONS
  ),
  metropolys: dynamic(
    () => import(/* webpackChunkName: "metropolys" */ "./metropolys"),
    DYNAMIC_OPTIONS
  ),
  papayoo: dynamic(
    () => import(/* webpackChunkName: "papayoo" */ "./papayoo"),
    DYNAMIC_OPTIONS
  ),
  roborally: dynamic(
    () => import(/* webpackChunkName: "roborally" */ "./roborally"),
    DYNAMIC_OPTIONS
  ),
}
