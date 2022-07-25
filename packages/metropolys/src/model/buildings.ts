import { generate } from "@boardgames/utils"

export enum BuildingSize {
  SMALL = 0,
  MEDIUM = 1,
  LARGE = 2,
}

export const BUILDINGS: {
  [building in number]: {
    size: BuildingSize
  }
} = {
  // Small buildings
  1: {
    size: BuildingSize.SMALL,
  },
  2: {
    size: BuildingSize.SMALL,
  },
  3: {
    size: BuildingSize.SMALL,
  },
  4: {
    size: BuildingSize.SMALL,
  },
  5: {
    size: BuildingSize.SMALL,
  },
  // Medium buildings
  6: {
    size: BuildingSize.MEDIUM,
  },
  7: {
    size: BuildingSize.MEDIUM,
  },
  8: {
    size: BuildingSize.MEDIUM,
  },
  9: {
    size: BuildingSize.MEDIUM,
  },
  // Large buildings
  10: {
    size: BuildingSize.LARGE,
  },
  11: {
    size: BuildingSize.LARGE,
  },
  12: {
    size: BuildingSize.LARGE,
  },
  13: {
    size: BuildingSize.LARGE,
  },
}

export function getBuildingSize(height: number): BuildingSize {
  return BUILDINGS[height].size
}

export function getBuildings(): number[] {
  return Object.keys(BUILDINGS).map(Number)
}

export function getInitialBuildings(): Record<number, boolean> {
  return generate(getBuildings(), height => [height, true])
}

export function isValidBuilding(height: number): boolean {
  return height in BUILDINGS
}
