import { createTestContext } from "lib/games/test/utils"

import { RoborallyContext } from "../../context"
import { BoardId, RoborallyBoard } from "../../model"

const TEST_BOARD: RoborallyBoard = {
  cells: {},
  checkpoints: [
    {
      x: 1,
      y: 1,
    },
    {
      x: 2,
      y: 2,
    },
    {
      x: 3,
      y: 3,
    },
    {
      x: 4,
      y: 4,
    },
    {
      x: 5,
      y: 5,
    },
    {
      x: 6,
      y: 6,
    },
  ],
  dimensions: {
    x: 12,
    y: 12,
  },
  features: [],
}

export async function createRoborallyTestContext(
  playerCount: number,
  board?: Partial<RoborallyBoard>
): Promise<RoborallyContext> {
  return createTestContext(
    RoborallyContext,
    playerCount,
    {
      boardId: "test" as BoardId,
      checkpoints: (board?.checkpoints ?? TEST_BOARD.checkpoints).length - 1,
    },
    {
      "games/roborally/boards/test": {
        ...TEST_BOARD,
        ...board,
      },
    }
  )
}
