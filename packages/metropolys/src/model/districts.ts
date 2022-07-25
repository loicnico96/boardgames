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

export const DISTRICTS: {
  [district in number]: {
    adjacent: number[]
    color: DistrictColor
    sector: DistrictSector
  }
} = {
  // Central sector
  0: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  1: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  2: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  3: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  4: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  5: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  6: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  7: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  8: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  9: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  10: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  11: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  12: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  13: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  14: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.CENTER,
  },
  // North sector
  15: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.NORTH,
  },
  16: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.NORTH,
  },
  17: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.NORTH,
  },
  18: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.NORTH,
  },
  19: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.NORTH,
  },
  20: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.NORTH,
  },
  21: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.NORTH,
  },
  22: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.NORTH,
  },
  23: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.NORTH,
  },
  24: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.NORTH,
  },
  // East sector
  25: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.EAST,
  },
  26: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.EAST,
  },
  27: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.EAST,
  },
  28: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.EAST,
  },
  29: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.EAST,
  },
  30: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.EAST,
  },
  31: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.EAST,
  },
  32: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.EAST,
  },
  33: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.EAST,
  },
  34: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.EAST,
  },
  // South sector
  35: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.SOUTH,
  },
  36: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.SOUTH,
  },
  37: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.SOUTH,
  },
  38: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.SOUTH,
  },
  39: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.SOUTH,
  },
  40: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.SOUTH,
  },
  41: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.SOUTH,
  },
  42: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.SOUTH,
  },
  43: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.SOUTH,
  },
  44: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.SOUTH,
  },
  // West sector
  45: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.WEST,
  },
  46: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.WEST,
  },
  47: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.WEST,
  },
  48: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.WEST,
  },
  49: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.WEST,
  },
  50: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.WEST,
  },
  51: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.WEST,
  },
  52: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.WEST,
  },
  53: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.WEST,
  },
  54: {
    adjacent: [],
    color: DistrictColor.RED,
    sector: DistrictSector.WEST,
  },
}

export function getAdjacentDistricts(district: number): number[] {
  return DISTRICTS[district].adjacent
}

export function getDistrictColor(district: number): DistrictColor {
  return DISTRICTS[district].color
}

export function getDistrictSector(district: number): DistrictSector {
  return DISTRICTS[district].sector
}

export function getDistricts(): number[] {
  return Object.keys(DISTRICTS).map(Number)
}

export function isAdjacent(districtA: number, districtB: number): boolean {
  return getAdjacentDistricts(districtA).includes(districtB)
}

export function isBridge(districtA: number, districtB: number): boolean {
  return (
    isAdjacent(districtA, districtB) &&
    getDistrictSector(districtA) !== getDistrictSector(districtB)
  )
}

export function isTokenAssignable(district: number): boolean {
  return getAdjacentDistricts(district).length > 2
}

export function isValidDistrict(district: number): boolean {
  return district in DISTRICTS
}
