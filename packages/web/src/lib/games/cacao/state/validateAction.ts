import { BaseAction } from "@boardgames/common"
import { Pos, array, integer, object, objectUnion } from "@boardgames/utils"

import { CacaoContext } from "../context"
import { BoardTile, CacaoAction, isForestTile, isVillageTile } from "../model"

import { PLAYER_HAND_SIZE } from "./getInitialGameState"

export function getAdjacentPositions(pos: Pos): Pos[] {
  return [
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x + 1, y: pos.y },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x - 1, y: pos.y },
  ]
}

export function getAdjacentTiles(context: CacaoContext, pos: Pos): BoardTile[] {
  return getAdjacentPositions(pos).map(adjacentPos => context.tile(adjacentPos))
}

export function isFillable(
  context: CacaoContext,
  pos: Pos,
  fillThreshold: number
): boolean {
  return (
    context.isEmpty(pos) &&
    getAdjacentPositions(pos).filter(villagePos => !context.isEmpty(villagePos))
      .length >= fillThreshold
  )
}

export function getForestFillPositions(
  context: CacaoContext,
  pos: Pos,
  fillThreshold: number
): Pos[] {
  return getAdjacentPositions(pos).filter(forestPos =>
    isFillable(context, forestPos, fillThreshold)
  )
}

export function validateAction(
  context: CacaoContext,
  playerId: string,
  action: BaseAction
): CacaoAction {
  const { hand, sun } = context.player(playerId)

  return objectUnion(
    "code",
    {
      playTile: {
        forests: array(
          object({
            pos: object({
              x: integer({
                min: 0,
                max: 16,
              }),
              y: integer({
                min: 0,
                max: 16,
              }),
            }),
            index: integer({
              min: 0,
              max: 2,
              custom: index => {
                if (context.state.tiles[index] === null) {
                  throw Error("Invalid tile")
                }
              },
            }),
          }),
          {
            maxLength: context.state.tiles.length,
            custom: forests => {
              const indexes = forests.map(forest => forest.index)
              if (new Set(indexes).size !== indexes.length) {
                throw Error("Duplicate tile")
              }
            },
          }
        ),
        village: object({
          pos: object({
            x: integer({
              min: 0,
              max: 16,
            }),
            y: integer({
              min: 0,
              max: 16,
            }),
          }),
          rot: integer({
            min: 0,
            max: 3,
          }),
          index: integer({
            min: 0,
            max: PLAYER_HAND_SIZE,
            custom: index => {
              if (hand[index] === null) {
                throw Error("Invalid tile")
              }
            },
          }),
        }),
      },
    },
    {
      custom: ({ forests, village: { pos } }) => {
        const existingTile = context.tile(pos)

        // Cannot build on existing Forest tiles
        if (isForestTile(existingTile)) {
          throw Error("You cannot place this tile here.")
        }

        // Can only built on existing Village tiles by using a Sun Disk
        if (isVillageTile(existingTile)) {
          // Check that Forest deck is empty
          if (context.state.deck.length > 0) {
            throw Error(
              "You can only use Sun Disks after the Forest deck runs out."
            )
          }

          // Check that player has a Sun Disk
          if (sun < 1) {
            throw Error("You have no Sun Disks.")
          }

          // Check that the location contains a Village tile of the same player
          if (existingTile.playerId !== playerId) {
            throw Error("You can only build upon your own Village tiles.")
          }
        }

        // Check that there exists at least one adjacent Forest tile
        const adjacentTiles = getAdjacentTiles(context, pos)
        if (!adjacentTiles.some(isForestTile)) {
          throw Error("You cannot place this tile here.")
        }

        // Check that the correct number of extra Forest tiles are provided
        const fillPositions = getForestFillPositions(context, pos, 1)
        const fillCount = Math.min(
          fillPositions.length,
          context.state.tiles.length
        )
        if (forests.length !== fillCount) {
          throw Error(`You must choose ${fillCount} Forest tiles to place.`)
        }
      },
    }
  )(action)
}
