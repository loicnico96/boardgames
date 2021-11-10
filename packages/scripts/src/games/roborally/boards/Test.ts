import { BoardBuilder } from "../builder"

const builder = new BoardBuilder(12, 12)

builder.cell(2, 2).checkpoint()

builder.cell(3, 3).conveyor(0, true).pusher(1, [0, 2, 4])

builder.cell(4, 4).hole().water()

export const Test = builder.board
