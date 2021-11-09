import { BaseAction } from "@boardgames/common"
import {
  array,
  getAdjacentPos,
  integer,
  object,
  objectUnion,
  isSamePos,
} from "@boardgames/utils"

import { getTile, isEmpty, isFillable, isVillageSpace } from "./board"
import { BOARD_SIZE, FOREST_DISPLAY_COUNT, PLAYER_HAND_SIZE } from "./constants"
import { CacaoAction, CacaoState, isVillageTile } from "./model"

export function validateAction(
  state: CacaoState,
  playerId: string,
  action: BaseAction
): CacaoAction {
  const player = state.players[playerId]

  return objectUnion(
    "code",
    {
      playTile: {
        forests: array(
          object({
            pos: object({
              x: integer({
                min: 0,
                max: BOARD_SIZE - 1,
              }),
              y: integer({
                min: 0,
                max: BOARD_SIZE - 1,
              }),
            }),
            index: integer({
              min: 0,
              max: FOREST_DISPLAY_COUNT - 1,
              custom: index => {
                if (state.tiles[index] === null) {
                  throw Error("This Forest tile is not available.")
                }
              },
            }),
          }),
          {
            maxLength: FOREST_DISPLAY_COUNT,
            custom: forests => {
              if (forests.length === 2) {
                if (forests[0].index === forests[1].index) {
                  throw Error("You cannot use the same Forest tile twice.")
                }

                if (isSamePos(forests[0].pos, forests[1].pos)) {
                  throw Error("You cannot fill the same Forest space twice.")
                }
              }
            },
          }
        ),
        village: object({
          pos: object({
            x: integer({
              min: 0,
              max: BOARD_SIZE - 1,
            }),
            y: integer({
              min: 0,
              max: BOARD_SIZE - 1,
            }),
          }),
          rot: integer(),
          index: integer({
            min: 0,
            max: PLAYER_HAND_SIZE - 1,
            custom: index => {
              if (player.hand[index] === null) {
                throw Error("This Village tile is not available.")
              }
            },
          }),
        }),
      },
    },
    {
      custom: ({ forests, village: { pos } }) => {
        // Cannot build on existing Forest spaces
        if (!isVillageSpace(pos)) {
          throw Error("You cannot place a Village tile here.")
        }

        const existingTile = getTile(state, pos)
        const forestTiles = state.tiles.filter(tile => tile !== null)

        // Can only built on existing Village tiles by using a Sun Disk
        if (isVillageTile(existingTile)) {
          // Check that Forest deck and display are both empty
          if (state.deck.length > 0 || forestTiles.length > 0) {
            throw Error(
              "You can only use Sun Disks after running out of Forest tiles."
            )
          }

          // Check that player has a Sun Disk to spend
          if (player.sun < 1) {
            throw Error("You have no Sun Disks.")
          }

          // Check that the location contains a Village tile of the same player
          if (existingTile.playerId !== playerId) {
            throw Error("You can only build upon your own Village tiles.")
          }
        }

        // Check that there exists at least one adjacent tile
        const adjacentPositions = getAdjacentPos(pos).filter(
          adjacentPos => !isEmpty(state, adjacentPos)
        )

        if (adjacentPositions.length < 1) {
          throw Error("You cannot place a Village tile here.")
        }

        // Check that the correct number of extra Forest tiles are provided
        const fillPositions = getAdjacentPos(pos).filter(adjacentPos =>
          isFillable(state, adjacentPos, false)
        )

        const fillCount = Math.min(fillPositions.length, forestTiles.length)

        if (forests.length !== fillCount) {
          throw Error(`You must choose ${fillCount} Forest tiles to place.`)
        }

        // Check that the Forest tiles are placed in appropriate spaces
        for (const forest of forests) {
          if (!fillPositions.some(fillPos => isSamePos(forest.pos, fillPos))) {
            throw Error("You cannot place a Forest tile here.")
          }
        }
      },
    }
  )(action)
}
