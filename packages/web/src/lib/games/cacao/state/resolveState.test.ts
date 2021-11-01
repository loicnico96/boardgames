import { Direction } from "@boardgames/utils"

import { CacaoContext } from "../context"
import { ForestType, VillageType } from "../model"

import { MOCKS } from "./mocks"

describe("resolveState", () => {
  it("refills Forest tiles and assigns starting player", async () => {
    const { initialState, playerOrder, players } = MOCKS[2]

    const context = new CacaoContext()

    context.initState(playerOrder, players, { seed: 0 })

    expect(context.state).toStrictEqual(initialState)

    const onStateChange = jest.fn()

    await context.resolve(onStateChange)

    expect(onStateChange).toHaveBeenCalledTimes(3)

    expect(onStateChange).toHaveBeenNthCalledWith(
      1,
      {
        ...initialState,
        deck: initialState.deck.slice(1),
        tiles: [ForestType.TEMPLE, null],
      },
      {
        code: "refillForest",
        index: 0,
        type: ForestType.TEMPLE,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      2,
      {
        ...initialState,
        deck: initialState.deck.slice(2),
        tiles: [ForestType.TEMPLE, ForestType.CACAO_1],
      },
      {
        code: "refillForest",
        index: 1,
        type: ForestType.CACAO_1,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      3,
      {
        ...initialState,
        currentPlayerId: initialState.startingPlayerId,
        deck: initialState.deck.slice(2),
        players: {
          ...initialState.players,
          player2: {
            ...initialState.players.player2,
            ready: false,
          },
        },
        tiles: [ForestType.TEMPLE, ForestType.CACAO_1],
      },
      {
        code: "nextPlayer",
        playerId: "player2",
      }
    )

    expect(context.state).toStrictEqual({
      ...initialState,
      currentPlayerId: initialState.startingPlayerId,
      deck: initialState.deck.slice(2),
      players: {
        ...initialState.players,
        player2: {
          ...initialState.players.player2,
          ready: false,
        },
      },
      tiles: [ForestType.TEMPLE, ForestType.CACAO_1],
    })
  })

  it("places a Village tile and resolves workers", async () => {
    const { initialState, playerOrder, players } = MOCKS[2]

    const context = new CacaoContext()

    context.initState(playerOrder, players, { seed: 0 })

    expect(context.state).toStrictEqual(initialState)

    await context.resolve()

    expect(context.state.players.player2.ready).toBe(false)

    const action = context.validateAction("player2", {
      code: "playTile",
      forests: [],
      village: {
        index: 1,
        pos: {
          x: 8,
          y: 9,
        },
        rot: 3,
      },
    })

    context.setAction("player2", action)

    const onStateChange = jest.fn()

    await context.resolve(onStateChange)

    expect(onStateChange).toHaveBeenCalledTimes(6)

    expect(onStateChange).toHaveBeenNthCalledWith(
      1,
      {
        ...initialState,
        board: {
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player2",
        deck: initialState.deck.slice(2),
        players: {
          ...initialState.players,
          player2: {
            ...initialState.players.player2,
            action,
            hand: [VillageType.VILLAGE_2101, VillageType.VILLAGE_1111],
          },
        },
        tiles: [ForestType.TEMPLE, ForestType.CACAO_1],
      },
      {
        code: "placeVillageTile",
        overbuilt: false,
        playerId: "player2",
        pos: { x: 8, y: 9 },
        rot: 3,
        type: VillageType.VILLAGE_2101,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      2,
      {
        ...initialState,
        board: {
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player2",
        deck: initialState.deck.slice(2),
        players: {
          ...initialState.players,
          player2: {
            ...initialState.players.player2,
            action,
            hand: [VillageType.VILLAGE_2101, VillageType.VILLAGE_1111],
          },
        },
        tiles: [ForestType.TEMPLE, ForestType.CACAO_1],
      },
      {
        code: "workers",
        dir: Direction.NORTH,
        playerId: "player2",
        pos: { x: 8, y: 9 },
        workers: 2,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      3,
      {
        ...initialState,
        board: {
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player2",
        deck: initialState.deck.slice(2),
        players: {
          ...initialState.players,
          player2: {
            ...initialState.players.player2,
            action,
            beans: 2,
            hand: [VillageType.VILLAGE_2101, VillageType.VILLAGE_1111],
          },
        },
        tiles: [ForestType.TEMPLE, ForestType.CACAO_1],
      },
      {
        code: "gainBeans",
        playerId: "player2",
        amount: 2,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      4,
      {
        ...initialState,
        board: {
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player2",
        deck: initialState.deck.slice(2),
        players: {
          ...initialState.players,
          player2: {
            ...initialState.players.player2,
            action,
            beans: 2,
            hand: [VillageType.VILLAGE_2101, VillageType.VILLAGE_1111],
          },
        },
        tiles: [ForestType.TEMPLE, ForestType.CACAO_1],
      },
      {
        code: "workers",
        dir: Direction.EAST,
        playerId: "player2",
        pos: { x: 8, y: 9 },
        workers: 1,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      5,
      {
        ...initialState,
        board: {
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player2",
        deck: initialState.deck.slice(2),
        players: {
          ...initialState.players,
          player2: {
            ...initialState.players.player2,
            action,
            beans: 1,
            coins: 2,
            hand: [VillageType.VILLAGE_2101, VillageType.VILLAGE_1111],
          },
        },
        tiles: [ForestType.TEMPLE, ForestType.CACAO_1],
      },
      {
        code: "sellBeans",
        playerId: "player2",
        amount: 1,
        price: 2,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      6,
      {
        ...initialState,
        board: {
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player1",
        deck: initialState.deck.slice(2),
        players: {
          player1: {
            ...initialState.players.player1,
            ready: false,
          },
          player2: {
            ...initialState.players.player2,
            action,
            beans: 1,
            coins: 2,
            deck: initialState.players.player2.deck.slice(1),
            hand: [
              VillageType.VILLAGE_2101,
              VillageType.VILLAGE_1111,
              VillageType.VILLAGE_1111,
            ],
          },
        },
        tiles: [ForestType.TEMPLE, ForestType.CACAO_1],
      },
      {
        code: "nextPlayer",
        playerId: "player1",
      }
    )
  })

  it("places a Village tile and fills adjacent Forests (2)", async () => {
    const { initialState, playerOrder, players } = MOCKS[2]

    const context = new CacaoContext()

    context.initState(playerOrder, players, { seed: 0 })

    expect(context.state).toStrictEqual(initialState)

    await context.resolve()

    const actionPlayer2 = context.validateAction("player2", {
      code: "playTile",
      forests: [],
      village: {
        index: 1,
        pos: {
          x: 8,
          y: 9,
        },
        rot: 3,
      },
    })

    context.setAction("player2", actionPlayer2)

    await context.resolve()

    expect(context.state.players.player1.ready).toBe(false)

    const actionPlayer1 = context.validateAction("player1", {
      code: "playTile",
      forests: [
        {
          index: 1,
          pos: {
            x: 7,
            y: 9,
          },
        },
      ],
      village: {
        index: 0,
        pos: {
          x: 7,
          y: 8,
        },
        rot: 1,
      },
    })

    context.setAction("player1", actionPlayer1)

    const onStateChange = jest.fn()

    await context.resolve(onStateChange)

    expect(onStateChange).toHaveBeenCalledTimes(10)

    expect(onStateChange).toHaveBeenNthCalledWith(
      1,
      {
        ...initialState,
        board: {
          7: {
            8: {
              playerId: "player1",
              rot: 1,
              type: VillageType.VILLAGE_3001,
            },
          },
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player1",
        deck: initialState.deck.slice(2),
        players: {
          player1: {
            ...initialState.players.player1,
            action: actionPlayer1,
            hand: [VillageType.VILLAGE_2101, VillageType.VILLAGE_1111],
          },
          player2: {
            ...initialState.players.player2,
            action: actionPlayer2,
            beans: 1,
            coins: 2,
            deck: initialState.players.player2.deck.slice(1),
            hand: [
              VillageType.VILLAGE_2101,
              VillageType.VILLAGE_1111,
              VillageType.VILLAGE_1111,
            ],
          },
        },
        tiles: [ForestType.TEMPLE, ForestType.CACAO_1],
      },
      {
        code: "placeVillageTile",
        overbuilt: false,
        playerId: "player1",
        pos: { x: 7, y: 8 },
        rot: 1,
        type: VillageType.VILLAGE_3001,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      2,
      {
        ...initialState,
        board: {
          7: {
            8: {
              playerId: "player1",
              rot: 1,
              type: VillageType.VILLAGE_3001,
            },
            9: {
              type: ForestType.CACAO_1,
            },
          },
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player1",
        deck: initialState.deck.slice(2),
        players: {
          player1: {
            ...initialState.players.player1,
            action: actionPlayer1,
            hand: [VillageType.VILLAGE_2101, VillageType.VILLAGE_1111],
          },
          player2: {
            ...initialState.players.player2,
            action: actionPlayer2,
            beans: 1,
            coins: 2,
            deck: initialState.players.player2.deck.slice(1),
            hand: [
              VillageType.VILLAGE_2101,
              VillageType.VILLAGE_1111,
              VillageType.VILLAGE_1111,
            ],
          },
        },
        tiles: [ForestType.TEMPLE, null],
      },
      {
        code: "placeForestTile",
        pos: { x: 7, y: 9 },
        type: ForestType.CACAO_1,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      3,
      {
        ...initialState,
        board: {
          7: {
            8: {
              playerId: "player1",
              rot: 1,
              type: VillageType.VILLAGE_3001,
            },
            9: {
              type: ForestType.CACAO_1,
            },
          },
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player1",
        deck: initialState.deck.slice(2),
        players: {
          player1: {
            ...initialState.players.player1,
            action: actionPlayer1,
            hand: [VillageType.VILLAGE_2101, VillageType.VILLAGE_1111],
          },
          player2: {
            ...initialState.players.player2,
            action: actionPlayer2,
            beans: 1,
            coins: 2,
            deck: initialState.players.player2.deck.slice(1),
            hand: [
              VillageType.VILLAGE_2101,
              VillageType.VILLAGE_1111,
              VillageType.VILLAGE_1111,
            ],
          },
        },
        tiles: [ForestType.TEMPLE, null],
      },
      {
        code: "workers",
        dir: Direction.EAST,
        playerId: "player1",
        pos: { x: 7, y: 8 },
        workers: 1,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      4,
      {
        ...initialState,
        board: {
          7: {
            8: {
              playerId: "player1",
              rot: 1,
              type: VillageType.VILLAGE_3001,
            },
            9: {
              type: ForestType.CACAO_1,
            },
          },
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player1",
        deck: initialState.deck.slice(2),
        players: {
          player1: {
            ...initialState.players.player1,
            action: actionPlayer1,
            beans: 1,
            hand: [VillageType.VILLAGE_2101, VillageType.VILLAGE_1111],
          },
          player2: {
            ...initialState.players.player2,
            action: actionPlayer2,
            beans: 1,
            coins: 2,
            deck: initialState.players.player2.deck.slice(1),
            hand: [
              VillageType.VILLAGE_2101,
              VillageType.VILLAGE_1111,
              VillageType.VILLAGE_1111,
            ],
          },
        },
        tiles: [ForestType.TEMPLE, null],
      },
      {
        code: "gainBeans",
        playerId: "player1",
        amount: 1,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      5,
      {
        ...initialState,
        board: {
          7: {
            8: {
              playerId: "player1",
              rot: 1,
              type: VillageType.VILLAGE_3001,
            },
            9: {
              type: ForestType.CACAO_1,
            },
          },
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player1",
        deck: initialState.deck.slice(2),
        players: {
          player1: {
            ...initialState.players.player1,
            action: actionPlayer1,
            beans: 1,
            hand: [VillageType.VILLAGE_2101, VillageType.VILLAGE_1111],
          },
          player2: {
            ...initialState.players.player2,
            action: actionPlayer2,
            beans: 1,
            coins: 2,
            deck: initialState.players.player2.deck.slice(1),
            hand: [
              VillageType.VILLAGE_2101,
              VillageType.VILLAGE_1111,
              VillageType.VILLAGE_1111,
            ],
          },
        },
        tiles: [ForestType.TEMPLE, null],
      },
      {
        code: "workers",
        dir: Direction.SOUTH,
        playerId: "player1",
        pos: { x: 7, y: 8 },
        workers: 3,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      6,
      {
        ...initialState,
        board: {
          7: {
            8: {
              playerId: "player1",
              rot: 1,
              type: VillageType.VILLAGE_3001,
            },
            9: {
              type: ForestType.CACAO_1,
            },
          },
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player1",
        deck: initialState.deck.slice(2),
        players: {
          player1: {
            ...initialState.players.player1,
            action: actionPlayer1,
            beans: 4,
            hand: [VillageType.VILLAGE_2101, VillageType.VILLAGE_1111],
          },
          player2: {
            ...initialState.players.player2,
            action: actionPlayer2,
            beans: 1,
            coins: 2,
            deck: initialState.players.player2.deck.slice(1),
            hand: [
              VillageType.VILLAGE_2101,
              VillageType.VILLAGE_1111,
              VillageType.VILLAGE_1111,
            ],
          },
        },
        tiles: [ForestType.TEMPLE, null],
      },
      {
        code: "gainBeans",
        playerId: "player1",
        amount: 3,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      7,
      {
        ...initialState,
        board: {
          7: {
            8: {
              playerId: "player1",
              rot: 1,
              type: VillageType.VILLAGE_3001,
            },
            9: {
              type: ForestType.CACAO_1,
            },
          },
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player1",
        deck: initialState.deck.slice(2),
        players: {
          player1: {
            ...initialState.players.player1,
            action: actionPlayer1,
            beans: 4,
            hand: [VillageType.VILLAGE_2101, VillageType.VILLAGE_1111],
          },
          player2: {
            ...initialState.players.player2,
            action: actionPlayer2,
            beans: 1,
            coins: 2,
            deck: initialState.players.player2.deck.slice(1),
            hand: [
              VillageType.VILLAGE_2101,
              VillageType.VILLAGE_1111,
              VillageType.VILLAGE_1111,
            ],
          },
        },
        tiles: [ForestType.TEMPLE, null],
      },
      {
        code: "workers",
        dir: Direction.WEST,
        playerId: "player2",
        pos: { x: 8, y: 9 },
        workers: 1,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      8,
      {
        ...initialState,
        board: {
          7: {
            8: {
              playerId: "player1",
              rot: 1,
              type: VillageType.VILLAGE_3001,
            },
            9: {
              type: ForestType.CACAO_1,
            },
          },
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player1",
        deck: initialState.deck.slice(2),
        players: {
          player1: {
            ...initialState.players.player1,
            action: actionPlayer1,
            beans: 4,
            hand: [VillageType.VILLAGE_2101, VillageType.VILLAGE_1111],
          },
          player2: {
            ...initialState.players.player2,
            action: actionPlayer2,
            beans: 2,
            coins: 2,
            deck: initialState.players.player2.deck.slice(1),
            hand: [
              VillageType.VILLAGE_2101,
              VillageType.VILLAGE_1111,
              VillageType.VILLAGE_1111,
            ],
          },
        },
        tiles: [ForestType.TEMPLE, null],
      },
      {
        code: "gainBeans",
        playerId: "player2",
        amount: 1,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      9,
      {
        ...initialState,
        board: {
          7: {
            8: {
              playerId: "player1",
              rot: 1,
              type: VillageType.VILLAGE_3001,
            },
            9: {
              type: ForestType.CACAO_1,
            },
          },
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player1",
        deck: initialState.deck.slice(3),
        players: {
          player1: {
            ...initialState.players.player1,
            action: actionPlayer1,
            beans: 4,
            deck: initialState.players.player1.deck.slice(1),
            hand: [
              VillageType.VILLAGE_2101,
              VillageType.VILLAGE_1111,
              VillageType.VILLAGE_3100,
            ],
          },
          player2: {
            ...initialState.players.player2,
            action: actionPlayer2,
            beans: 2,
            coins: 2,
            deck: initialState.players.player2.deck.slice(1),
            hand: [
              VillageType.VILLAGE_2101,
              VillageType.VILLAGE_1111,
              VillageType.VILLAGE_1111,
            ],
          },
        },
        tiles: [ForestType.TEMPLE, ForestType.TEMPLE],
      },
      {
        code: "refillForest",
        index: 1,
        type: ForestType.TEMPLE,
      }
    )

    expect(onStateChange).toHaveBeenNthCalledWith(
      10,
      {
        ...initialState,
        board: {
          7: {
            8: {
              playerId: "player1",
              rot: 1,
              type: VillageType.VILLAGE_3001,
            },
            9: {
              type: ForestType.CACAO_1,
            },
          },
          8: {
            8: {
              type: ForestType.CACAO_1,
            },
            9: {
              playerId: "player2",
              rot: 3,
              type: VillageType.VILLAGE_2101,
            },
          },
          9: {
            9: {
              type: ForestType.MARKET_2,
            },
          },
        },
        currentPlayerId: "player2",
        deck: initialState.deck.slice(3),
        players: {
          player1: {
            ...initialState.players.player1,
            action: actionPlayer1,
            beans: 4,
            deck: initialState.players.player1.deck.slice(1),
            hand: [
              VillageType.VILLAGE_2101,
              VillageType.VILLAGE_1111,
              VillageType.VILLAGE_3100,
            ],
          },
          player2: {
            ...initialState.players.player2,
            beans: 2,
            coins: 2,
            deck: initialState.players.player2.deck.slice(1),
            hand: [
              VillageType.VILLAGE_2101,
              VillageType.VILLAGE_1111,
              VillageType.VILLAGE_1111,
            ],
            ready: false,
          },
        },
        tiles: [ForestType.TEMPLE, ForestType.TEMPLE],
      },
      {
        code: "nextPlayer",
        playerId: "player2",
      }
    )
  })

  it("places a Village tile and fills adjacent Forests", async () => {
    const { initialState, playerOrder, players } = MOCKS[2]

    const context = new CacaoContext()

    context.initState(playerOrder, players, { seed: 0 })

    expect(context.state).toStrictEqual(initialState)

    await context.resolve()

    context.setAction("player2", {
      code: "playTile",
      forests: [],
      village: {
        index: 1,
        pos: {
          x: 8,
          y: 9,
        },
        rot: 3,
      },
    })

    await context.resolve()

    context.setAction("player1", {
      code: "playTile",
      forests: [
        {
          index: 1,
          pos: {
            x: 7,
            y: 9,
          },
        },
      ],
      village: {
        index: 0,
        pos: {
          x: 7,
          y: 8,
        },
        rot: 1,
      },
    })

    await context.resolve()

    context.setAction("player2", {
      code: "playTile",
      forests: [
        {
          index: 0,
          pos: {
            x: 6,
            y: 8,
          },
        },
      ],
      village: {
        index: 2,
        pos: {
          x: 6,
          y: 9,
        },
        rot: 0,
      },
    })

    await context.resolve()

    console.log(context.state)

    context.setAction("player1", {
      code: "playTile",
      forests: [
        {
          index: 1,
          pos: {
            x: 6,
            y: 10,
          },
        },
        {
          index: 0,
          pos: {
            x: 8,
            y: 10,
          },
        },
      ],
      village: {
        index: 0,
        pos: {
          x: 7,
          y: 10,
        },
        rot: 0,
      },
    })

    await context.resolve()

    console.log(context.state)

    context.setAction("player2", {
      code: "playTile",
      forests: [
        {
          index: 1,
          pos: {
            x: 5,
            y: 9,
          },
        },
      ],
      village: {
        index: 0,
        pos: {
          x: 5,
          y: 8,
        },
        rot: 0,
      },
    })

    await context.resolve()

    console.log(context.state)
  })
})
