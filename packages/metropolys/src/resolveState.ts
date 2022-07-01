import { GameContext } from "@boardgames/common"

import { MetropolysModel } from "./model"
import { MetropolysAction } from "./model/action"
import {
  getTokenCount,
  hasAnyAvailableBuilding,
  isAbleToBid,
} from "./model/player"
import {
  getCurrentPlayerId,
  getDistrict,
  getHighestBid,
  getLastRuinsPlayerId,
  getMostMetroCount,
  getMostMetroPlayerId,
  getPlayer,
} from "./model/state"
import { Bid, Token } from "./model/types"

type MetropolysContext = GameContext<MetropolysModel>

export async function resolveState(context: MetropolysContext) {
  const currentPlayerId = getCurrentPlayerId(context.state)
  const currentPlayer = context.player(currentPlayerId)
  if (currentPlayer.action) {
    await resolvePlayerAction(context, currentPlayerId, currentPlayer.action)
    await endTurn(context)
  } else {
    await nextRound(context, currentPlayerId)
  }
}

async function resolvePlayerAction(
  context: MetropolysContext,
  playerId: string,
  action: MetropolysAction
) {
  context.clearAction(playerId)
  switch (action.code) {
    case "bid":
      return resolvePlayerBid(context, playerId, action.district, action.height)
    case "pass":
      return resolvePlayerPass(context, playerId)
  }
}

async function resolvePlayerBid(
  context: MetropolysContext,
  playerId: string,
  district: number,
  height: number
) {
  context.update({ bids: { $push: [{ district, height, playerId }] } })

  await context.post({ code: "bid", district, height, playerId })
}

async function resolvePlayerPass(context: MetropolysContext, playerId: string) {
  context.updatePlayer(playerId, { pass: { $set: true } })

  await context.post({ code: "pass", playerId })
}

async function endTurn(context: MetropolysContext) {
  const currentPlayerId = getCurrentPlayerId(context.state)
  const highestBid = getHighestBid(context.state)
  if (highestBid) {
    const nextPlayerId = context.nextPlayerWhich(
      currentPlayerId,
      (player, playerId) =>
        playerId !== highestBid.playerId && isAbleToBid(player, highestBid)
    )

    if (nextPlayerId) {
      await nextPlayer(context, nextPlayerId)
    } else {
      await winBid(context, highestBid)
    }
  } else {
    context.requireAction(currentPlayerId)
  }
}

async function winBid(context: MetropolysContext, bid: Bid) {
  const { district, height, playerId } = bid
  const { token } = getDistrict(context.state, district)

  context.update({
    bids: { $set: [] },
    currentPlayer: { $set: playerId },
    districts: {
      [district]: {
        building: {
          $set: {
            height,
            playerId,
          },
        },
      },
    },
  })

  context.updatePlayer(playerId, {
    buildings: {
      [height]: {
        $set: false,
      },
    },
  })

  await context.post({ code: "winBid", district, height, playerId })

  if (token) {
    await getToken(context, playerId, token)
  }

  const player = getPlayer(context.state, playerId)

  if (hasAnyAvailableBuilding(player)) {
    await nextRound(context, playerId)
  } else {
    await endGame(context, playerId)
  }
}

async function getToken(
  context: MetropolysContext,
  playerId: string,
  token: Token
) {
  const player = getPlayer(context.state, playerId)
  const count = getTokenCount(player, token) + 1

  context.updatePlayer(playerId, {
    tokens: {
      [token]: {
        $set: count,
      },
    },
  })

  await context.post({ code: "getToken", count, playerId, token })

  switch (token) {
    case Token.METRO: {
      const mostMetroCount = getMostMetroCount(context.state)
      const mostMetroPlayerId = getMostMetroPlayerId(context.state)
      if (mostMetroPlayerId !== playerId && count > mostMetroCount) {
        context.update({ mostMetro: { $set: playerId } })
        await context.post({ code: "mostMetro", count, playerId })
      }
      break
    }

    case Token.RUINS: {
      const lastRuinsPlayerId = getLastRuinsPlayerId(context.state)
      if (lastRuinsPlayerId !== playerId) {
        context.update({ lastRuins: { $set: playerId } })
        await context.post({ code: "lastRuins", playerId })
      }
      break
    }

    default:
  }
}

async function nextRound(context: MetropolysContext, startingPlayerId: string) {
  const round = context.state.round + 1

  context.update({ bids: { $set: [] }, round: { $set: round } })

  for (const playerId of context.state.playerOrder) {
    context.updatePlayer(playerId, { pass: { $set: false } })
  }

  await context.post({ code: "nextRound", playerId: startingPlayerId, round })

  await nextPlayer(context, startingPlayerId)
}

async function nextPlayer(context: MetropolysContext, nextPlayerId: string) {
  context.update({ currentPlayer: { $set: nextPlayerId } })

  context.requireAction(nextPlayerId)

  await context.post({ code: "nextPlayer", playerId: nextPlayerId })
}

async function endGame(context: MetropolysContext, playerId: string) {
  context.endGame()

  await context.post({ code: "endGame", playerId })
}
