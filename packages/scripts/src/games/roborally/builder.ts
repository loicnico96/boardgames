import { BoardFeature, Cell, RoborallyBoard } from "@boardgames/roborally"
import { Direction, Position, Rotation, unique } from "@boardgames/utils"
import update, { Spec } from "immutability-helper"

export class CellBuilder {
  public readonly builder: BoardBuilder
  public readonly pos: Position

  public constructor(builder: BoardBuilder, pos: Position) {
    this.builder = builder
    this.pos = pos
  }

  public checkpoint(): this {
    this.builder.update({
      checkpoints: existing => unique([...existing, this.pos]),
    })

    return this
  }

  public conveyor(dir: Direction, fast: boolean = false): this {
    if (fast) {
      this.builder.features(BoardFeature.CONVEYOR, BoardFeature.CONVEYOR_FAST)
      this.builder.updateCell(this.pos, {
        $merge: {
          conveyor: {
            dir,
            fast: true,
          },
        },
      })
    } else {
      this.builder.features(BoardFeature.CONVEYOR)
      this.builder.updateCell(this.pos, {
        $merge: {
          conveyor: {
            dir,
          },
        },
      })
    }

    return this
  }

  public crusher(active: number[]): this {
    this.builder.features(BoardFeature.CRUSHER)
    this.builder.updateCell(this.pos, {
      $merge: {
        crush: {
          active,
        },
      },
    })

    return this
  }

  public gear(rot: Rotation): this {
    this.builder.features(BoardFeature.GEAR)
    this.builder.updateCell(this.pos, {
      $merge: {
        gear: {
          rot,
        },
      },
    })

    return this
  }

  public hole(): this {
    this.builder.updateCell(this.pos, {
      $merge: {
        hole: true,
      },
    })

    return this
  }

  public portal(pos: Position): this {
    this.builder.features(BoardFeature.PORTAL)
    this.builder.updateCell(this.pos, {
      $merge: {
        portal: {
          pos,
        },
      },
    })

    return this
  }

  public laser(dir: Direction, damage: number = 1): this {
    this.builder.features(BoardFeature.LASER)
    this.builder.update({
      lasers: {
        $push: [
          {
            damage,
            pos: this.pos,
            dir,
          },
        ],
      },
    })

    return this
  }

  public pusher(dir: Direction, active: number[]): this {
    this.builder.features(BoardFeature.PUSHER)
    this.builder.updateCell(this.pos, {
      $merge: {
        push: {
          active,
          dir,
        },
      },
    })

    return this
  }

  public repair(): this {
    this.builder.features(BoardFeature.REPAIR)
    this.builder.updateCell(this.pos, {
      $merge: {
        repair: true,
      },
    })

    return this
  }

  public teleport(): this {
    this.builder.features(BoardFeature.TELEPORT)
    this.builder.updateCell(this.pos, {
      $merge: {
        teleport: true,
      },
    })

    return this
  }

  public trap(active: number[]): this {
    this.builder.features(BoardFeature.TRAP)
    this.builder.updateCell(this.pos, {
      $merge: {
        trap: {
          active,
        },
      },
    })

    return this
  }

  public wall(dir: Direction): this {
    this.builder.updateCell(this.pos, {
      walls: walls => unique([...(walls ?? []), dir]),
    })

    return this
  }

  public water(): this {
    this.builder.features(BoardFeature.WATER)
    this.builder.updateCell(this.pos, {
      $merge: {
        water: true,
      },
    })

    return this
  }
}

export class BoardBuilder {
  private __board: RoborallyBoard

  public constructor(width: number, height: number) {
    this.__board = {
      cells: {},
      checkpoints: [],
      dimensions: {
        x: width,
        y: height,
      },
      features: [],
      lasers: [],
    }
  }

  public get board() {
    return this.__board
  }

  public cell(x: number, y: number): CellBuilder {
    return new CellBuilder(this, { x, y })
  }

  public features(...features: BoardFeature[]) {
    this.update({
      features: existing => unique([...existing, ...features]),
    })
  }

  public updateCell(pos: Position, spec: Spec<Cell>) {
    this.update({
      cells: {
        [pos.x]: row =>
          update(row ?? {}, {
            [pos.y]: cell => update(cell ?? {}, spec),
          }),
      },
    })
  }

  public update(spec: Spec<RoborallyBoard>) {
    this.__board = update(this.__board, spec)
  }
}
