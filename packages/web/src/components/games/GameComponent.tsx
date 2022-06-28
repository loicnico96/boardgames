import dynamic from "next/dynamic"
import { ComponentType } from "react"

import { GameType } from "lib/games/types"

import { GameComponentLoader } from "./GameComponentLoader"

export const GameComponents: Record<GameType, ComponentType> = {
  metropolys: dynamic({
    loader: () => import(/* webpackChunkName: "metropolys" */ "./metropolys"),
    loading: GameComponentLoader,
    ssr: false,
  }),
  roborally: dynamic({
    loader: () => import(/* webpackChunkName: "roborally" */ "./roborally"),
    loading: GameComponentLoader,
    ssr: false,
  }),
}
