import { isEnum } from "@boardgames/utils"

export enum GameType {
  CACAO = "cacao",
  METROPOLYS = "metropolys",
  ROBORALLY = "roborally",
}

export function isGameType(value: unknown): value is GameType {
  return isEnum(value, GameType)
}
