import { CacaoContext } from "../context"

import { MOCKS } from "./mocks"

describe("getInitialGameState", () => {
  it("initializes game state for 2 players", () => {
    const context = new CacaoContext()

    context.initState(MOCKS[2].playerOrder, MOCKS[2].players, {}, 0)

    expect(context.state).toStrictEqual(MOCKS[2].initialState)
  })

  it("initializes game state for 3 players", () => {
    const context = new CacaoContext()

    context.initState(MOCKS[2].playerOrder, MOCKS[2].players, {}, 0)

    expect(context.state).toStrictEqual(MOCKS[3].initialState)
  })

  it("initializes game state for 4 players", () => {
    const context = new CacaoContext()

    context.initState(MOCKS[2].playerOrder, MOCKS[2].players, {}, 0)

    expect(context.state).toStrictEqual(MOCKS[4].initialState)
  })
})
