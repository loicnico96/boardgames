import { fill } from "@boardgames/utils"
import styled from "@emotion/styled"

import { useCurrentUserId } from "hooks/store/useCurrentUserId"
import { isForestTile, isVillageTile } from "lib/games/cacao/model"

import { BoardTile } from "./BoardTile"
import { ForestTile } from "./ForestTile"
import { useCacaoActions, useCacaoState, useCacaoStore } from "./store"
import { VillageTile } from "./VillageTile"

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const BoardRow = styled.div`
  display: flex;
`

export function GameBoard() {
  const board = useCacaoState(state => state.board)

  const selectedPos = useCacaoStore(store => store.village.pos)
  const selectedIndex = useCacaoStore(store => store.village.index)
  const selectedRot = useCacaoStore(store => store.village.rot)

  const { selectVillagePosition } = useCacaoActions()

  const userId = useCurrentUserId()
  const selectedTile = useCacaoState(store =>
    userId !== null && selectedIndex !== null
      ? store.players[userId]?.hand[selectedIndex] ?? null
      : null
  )

  return (
    <BoardContainer>
      {fill(16, y => (
        <BoardRow key={y}>
          {fill(16, x => {
            const row = board[x] ?? {}
            const tile = row[y]

            const selected =
              !!selectedPos && selectedPos.x === x && selectedPos.y === y

            if (tile) {
              if (isForestTile(tile)) {
                return <ForestTile key={x} {...tile} />
              }

              if (isVillageTile(tile)) {
                return <VillageTile key={x} selected={selected} {...tile} />
              }
            }

            if (selected && selectedTile !== null && userId !== null) {
              return (
                <VillageTile
                  key={x}
                  selected
                  type={selectedTile}
                  playerId={userId}
                  rot={selectedRot}
                />
              )
            }

            if (x % 2 !== y % 2 && selectedTile !== null) {
              return (
                <BoardTile
                  key={x}
                  onClick={() => selectVillagePosition(x, y)}
                  selected={selected}
                />
              )
            }

            return (
              <BoardTile selected={selected} key={x} title={`${x} : ${y}`} />
            )
          })}
        </BoardRow>
      ))}
    </BoardContainer>
  )
}
