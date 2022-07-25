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

const DISTRICTS: {
  [district in number]: {
    adjacent: number[]
    color: DistrictColor
    position: [number, number]
    sector: DistrictSector
  }
} = {
  // Central sector
  0: {
    adjacent: [2, 3, 19, 22],
    color: DistrictColor.GRAY,
    position: [42.4, 28.0],
    sector: DistrictSector.CENTER,
  },
  1: {
    adjacent: [2, 7, 49],
    color: DistrictColor.GREEN,
    position: [29.6, 42.2],
    sector: DistrictSector.CENTER,
  },
  2: {
    adjacent: [0, 1, 3],
    color: DistrictColor.RED,
    position: [35.7, 37.5],
    sector: DistrictSector.CENTER,
  },
  3: {
    adjacent: [0, 2, 4, 9],
    color: DistrictColor.BLUE,
    position: [48.2, 36.4],
    sector: DistrictSector.CENTER,
  },
  4: {
    adjacent: [3, 5, 9],
    color: DistrictColor.GRAY,
    position: [59.1, 39.5],
    sector: DistrictSector.CENTER,
  },
  5: {
    adjacent: [4, 6, 10, 30],
    color: DistrictColor.ORANGE,
    position: [70.1, 42.2],
    sector: DistrictSector.CENTER,
  },
  6: {
    adjacent: [5, 24, 25],
    color: DistrictColor.BLUE,
    position: [71.8, 34.1],
    sector: DistrictSector.CENTER,
  },
  7: {
    adjacent: [1, 8, 12, 52],
    color: DistrictColor.ORANGE,
    position: [36.1, 56.4],
    sector: DistrictSector.CENTER,
  },
  8: {
    adjacent: [7, 9],
    color: DistrictColor.GREEN,
    position: [45.8, 52.1],
    sector: DistrictSector.CENTER,
  },
  9: {
    adjacent: [3, 4, 8, 10],
    color: DistrictColor.ORANGE,
    position: [53.0, 47.8],
    sector: DistrictSector.CENTER,
  },
  10: {
    adjacent: [5, 9, 11, 13, 14],
    color: DistrictColor.RED,
    position: [61.9, 54.2],
    sector: DistrictSector.CENTER,
  },
  11: {
    adjacent: [10],
    color: DistrictColor.GRAY,
    position: [73.0, 55.3],
    sector: DistrictSector.CENTER,
  },
  12: {
    adjacent: [7, 13, 36],
    color: DistrictColor.RED,
    position: [42.4, 69.3],
    sector: DistrictSector.CENTER,
  },
  13: {
    adjacent: [10, 12, 14, 38],
    color: DistrictColor.BLUE,
    position: [53.6, 65.7],
    sector: DistrictSector.CENTER,
  },
  14: {
    adjacent: [10, 13, 33, 39],
    color: DistrictColor.GREEN,
    position: [66.2, 64.6],
    sector: DistrictSector.CENTER,
  },
  // North sector
  15: {
    adjacent: [16, 19, 45],
    color: DistrictColor.GRAY,
    position: [29.6, 6.6],
    sector: DistrictSector.NORTH,
  },
  16: {
    adjacent: [15, 17, 20],
    color: DistrictColor.BLUE,
    position: [45.8, 5.2],
    sector: DistrictSector.NORTH,
  },
  17: {
    adjacent: [16, 18, 22, 23],
    color: DistrictColor.GRAY,
    position: [58.9, 7.9],
    sector: DistrictSector.NORTH,
  },
  18: {
    adjacent: [17, 23, 26],
    color: DistrictColor.ORANGE,
    position: [78.0, 7.2],
    sector: DistrictSector.NORTH,
  },
  19: {
    adjacent: [0, 15, 20, 47],
    color: DistrictColor.ORANGE,
    position: [30.9, 18.9],
    sector: DistrictSector.NORTH,
  },
  20: {
    adjacent: [16, 19, 21, 22],
    color: DistrictColor.GREEN,
    position: [43.8, 14.4],
    sector: DistrictSector.NORTH,
  },
  21: {
    adjacent: [20],
    color: DistrictColor.RED,
    position: [38.9, 12.0],
    sector: DistrictSector.NORTH,
  },
  22: {
    adjacent: [0, 17, 20],
    color: DistrictColor.RED,
    position: [52.6, 17.8],
    sector: DistrictSector.NORTH,
  },
  23: {
    adjacent: [17, 18, 24, 25],
    color: DistrictColor.BLUE,
    position: [69.7, 18.3],
    sector: DistrictSector.NORTH,
  },
  24: {
    adjacent: [6, 23],
    color: DistrictColor.GREEN,
    position: [62.9, 26.9],
    sector: DistrictSector.NORTH,
  },
  // East sector
  25: {
    adjacent: [6, 23, 26, 27],
    color: DistrictColor.GRAY,
    position: [79.7, 23.9],
    sector: DistrictSector.EAST,
  },
  26: {
    adjacent: [18, 25, 29],
    color: DistrictColor.GREEN,
    position: [91.3, 15.1],
    sector: DistrictSector.EAST,
  },
  27: {
    adjacent: [25, 28, 29, 30],
    color: DistrictColor.RED,
    position: [84.5, 30.3],
    sector: DistrictSector.EAST,
  },
  28: {
    adjacent: [27],
    color: DistrictColor.GREEN,
    position: [88.9, 34.8],
    sector: DistrictSector.EAST,
  },
  29: {
    adjacent: [26, 27, 31],
    color: DistrictColor.ORANGE,
    position: [94.6, 27.3],
    sector: DistrictSector.EAST,
  },
  30: {
    adjacent: [5, 27, 31, 32],
    color: DistrictColor.BLUE,
    position: [83.5, 44.9],
    sector: DistrictSector.EAST,
  },
  31: {
    adjacent: [29, 30, 32],
    color: DistrictColor.GRAY,
    position: [94.3, 43.4],
    sector: DistrictSector.EAST,
  },
  32: {
    adjacent: [30, 31, 33, 34],
    color: DistrictColor.RED,
    position: [89.2, 58.9],
    sector: DistrictSector.EAST,
  },
  33: {
    adjacent: [14, 32, 34, 39, 43],
    color: DistrictColor.BLUE,
    position: [80.3, 72.4],
    sector: DistrictSector.EAST,
  },
  34: {
    adjacent: [32, 33, 44],
    color: DistrictColor.ORANGE,
    position: [92.6, 75.6],
    sector: DistrictSector.EAST,
  },
  // South sector
  35: {
    adjacent: [36],
    color: DistrictColor.ORANGE,
    position: [22.8, 85.1],
    sector: DistrictSector.SOUTH,
  },
  36: {
    adjacent: [12, 35, 37, 41, 52, 54],
    color: DistrictColor.GRAY,
    position: [30.2, 80.1],
    sector: DistrictSector.SOUTH,
  },
  37: {
    adjacent: [36, 38, 41],
    color: DistrictColor.GREEN,
    position: [43.5, 81.9],
    sector: DistrictSector.SOUTH,
  },
  38: {
    adjacent: [13, 37, 39, 42],
    color: DistrictColor.RED,
    position: [54.3, 78.8],
    sector: DistrictSector.SOUTH,
  },
  39: {
    adjacent: [14, 33, 38, 42],
    color: DistrictColor.ORANGE,
    position: [65.0, 76.5],
    sector: DistrictSector.SOUTH,
  },
  40: {
    adjacent: [41, 53],
    color: DistrictColor.GREEN,
    position: [17.9, 92.3],
    sector: DistrictSector.SOUTH,
  },
  41: {
    adjacent: [36, 37, 40, 42],
    color: DistrictColor.BLUE,
    position: [37.2, 93.4],
    sector: DistrictSector.SOUTH,
  },
  42: {
    adjacent: [38, 39, 41, 43],
    color: DistrictColor.GRAY,
    position: [61.5, 88.5],
    sector: DistrictSector.SOUTH,
  },
  43: {
    adjacent: [33, 42, 44],
    color: DistrictColor.RED,
    position: [76.6, 91.6],
    sector: DistrictSector.SOUTH,
  },
  44: {
    adjacent: [43, 34],
    color: DistrictColor.BLUE,
    position: [87.0, 91.9],
    sector: DistrictSector.SOUTH,
  },
  // West sector
  45: {
    adjacent: [15, 46, 47],
    color: DistrictColor.RED,
    position: [16.2, 11.0],
    sector: DistrictSector.WEST,
  },
  46: {
    adjacent: [45, 47, 48],
    color: DistrictColor.BLUE,
    position: [7.4, 23.2],
    sector: DistrictSector.WEST,
  },
  47: {
    adjacent: [19, 45, 46, 48, 49],
    color: DistrictColor.GREEN,
    position: [16.4, 29.4],
    sector: DistrictSector.WEST,
  },
  48: {
    adjacent: [46, 47, 51],
    color: DistrictColor.GRAY,
    position: [6.2, 42.5],
    sector: DistrictSector.WEST,
  },
  49: {
    adjacent: [1, 47, 52],
    color: DistrictColor.GRAY,
    position: [18.6, 46.3],
    sector: DistrictSector.WEST,
  },
  50: {
    adjacent: [51, 53],
    color: DistrictColor.GREEN,
    position: [4.0, 64.6],
    sector: DistrictSector.WEST,
  },
  51: {
    adjacent: [48, 50, 52, 54],
    color: DistrictColor.ORANGE,
    position: [11.1, 59.8],
    sector: DistrictSector.WEST,
  },
  52: {
    adjacent: [7, 36, 49, 51, 54],
    color: DistrictColor.BLUE,
    position: [22.9, 61.6],
    sector: DistrictSector.WEST,
  },
  53: {
    adjacent: [40, 50, 54],
    color: DistrictColor.ORANGE,
    position: [5.9, 80.3],
    sector: DistrictSector.WEST,
  },
  54: {
    adjacent: [36, 51, 52, 53],
    color: DistrictColor.RED,
    position: [15.1, 74.3],
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
