import { unique } from "@boardgames/utils"

import {
  DistrictColor,
  DistrictSector,
  getAdjacentDistricts,
  getDistrictColor,
  getDistricts,
  getDistrictSector,
  isAdjacent,
} from "./districts"

describe("districts", () => {
  const districts = getDistricts()

  it("has correct adjacent districts", () => {
    for (const district of districts) {
      const adjacentDistricts = getAdjacentDistricts(district)
      // Must not be empty
      expect(adjacentDistricts).not.toHaveLength(0)
      // Must not contain itself
      expect(adjacentDistricts).not.toContain(district)
      // Must not contain duplicates
      expect(adjacentDistricts).toHaveLength(unique(adjacentDistricts).length)
      // Must all be mutually adjacent
      for (const adjacentDistrict of adjacentDistricts) {
        expect(isAdjacent(adjacentDistrict, district)).toBe(true)
        expect(isAdjacent(district, adjacentDistrict)).toBe(true)
      }
    }
  })

  it("has correct number of districts", () => {
    expect(districts).toHaveLength(55)
  })

  it("has correct number of districts in each sector", () => {
    for (const sector of Object.values(DistrictSector)) {
      expect(
        districts.filter(district => getDistrictSector(district) === sector)
      ).toHaveLength(sector === DistrictSector.CENTER ? 15 : 10)
    }
  })

  it("has correct number of districts of each color", () => {
    for (const color of Object.values(DistrictColor)) {
      expect(
        districts.filter(district => getDistrictColor(district) === color)
      ).toHaveLength(11)
    }
  })
})
