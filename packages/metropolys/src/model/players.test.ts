import { DistrictColor } from "./districts"
import { MissionShape } from "./missions"
import {
  getAvailableBuildings,
  getInitialPlayerState,
  getTokenCount,
  hasAvailableBuilding,
  hasAvailableBuildings,
  hasPassed,
  MetropolysPlayer,
} from "./players"
import { Token } from "./tokens"

describe("players", () => {
  describe("getInitialPlayerState", () => {
    it("generates initial player state", () => {
      expect(
        getInitialPlayerState(
          { name: "test" },
          DistrictColor.RED,
          MissionShape.BRIDGES
        )
      ).toEqual<MetropolysPlayer>({
        action: null,
        buildings: {
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: true,
          7: true,
          8: true,
          9: true,
          10: true,
          11: true,
          12: true,
          13: true,
        },
        color: DistrictColor.RED,
        name: "test",
        pass: false,
        ready: true,
        shape: MissionShape.BRIDGES,
        tokens: {
          fancy: 0,
          metro: 0,
          ruins: 0,
        },
      })
    })
  })

  const player: MetropolysPlayer = {
    action: {
      code: "pass",
    },
    buildings: {
      1: true,
      2: false,
      3: false,
      4: true,
      5: true,
      6: false,
      7: true,
      8: false,
      9: true,
      10: true,
      11: true,
      12: false,
      13: false,
    },
    color: DistrictColor.ORANGE,
    name: "test",
    pass: true,
    ready: true,
    shape: MissionShape.LAKES,
    tokens: {
      fancy: 0,
      metro: 3,
      ruins: 6,
    },
  }

  describe("getAvailableBuildings", () => {
    it("returns list of available buildings", () => {
      expect(getAvailableBuildings(player)).toEqual([1, 4, 5, 7, 9, 10, 11])
    })

    it("returns list of available buildings with minimum height", () => {
      expect(getAvailableBuildings(player, 6)).toEqual([7, 9, 10, 11])
      expect(getAvailableBuildings(player, 9)).toEqual([9, 10, 11])
      expect(getAvailableBuildings(player, 12)).toEqual([])
    })
  })

  describe("getTokenCount", () => {
    it("returns number of tokens", () => {
      expect(getTokenCount(player, Token.FANCY)).toEqual(0)
      expect(getTokenCount(player, Token.METRO)).toEqual(3)
      expect(getTokenCount(player, Token.RUINS)).toEqual(6)
    })
  })

  describe("hasAvailableBuilding", () => {
    it("checks availability of building", () => {
      expect(hasAvailableBuilding(player, 6)).toBe(false)
      expect(hasAvailableBuilding(player, 9)).toBe(true)
      expect(hasAvailableBuilding(player, 12)).toBe(false)
    })
  })

  describe("hasAvailableBuildings", () => {
    it("checks availability of any building", () => {
      expect(hasAvailableBuildings(player)).toBe(true)
    })

    it("checks availability of any building with minimum height", () => {
      expect(hasAvailableBuildings(player, 6)).toBe(true)
      expect(hasAvailableBuildings(player, 9)).toBe(true)
      expect(hasAvailableBuildings(player, 12)).toBe(false)
    })
  })

  describe("hasPassed", () => {
    it("returns whether player has passed", () => {
      expect(hasPassed(player)).toBe(true)
    })
  })
})
