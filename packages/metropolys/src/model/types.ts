export const BUILDING_COUNT = 13
export const DISTRICT_COUNT = 55

export enum DistrictColor {
  BLUE = "blue",
  GRAY = "gray",
  GREEN = "green",
  ORANGE = "orange",
  RED = "red",
}

export enum DistrictSector {
  CENTER = "center",
  NORTH = "north",
  EAST = "east",
  SOUTH = "south",
  WEST = "west",
}

export enum Mission {
  BRIDGES = "bridges",
  CHAINS = "chains",
  LAKES = "lakes",
  SECTORS = "sectors",
  TOWERS = "towers",
}

export enum Token {
  FANCY = "fancy",
  METRO = "metro",
  RUINS = "ruins",
}

export type Bid = {
  district: number
  height: number
  playerId: string
}

export type DistrictBuilding = {
  height: number
  playerId: string
}

export type District = {
  building?: DistrictBuilding
  token?: Token
}
