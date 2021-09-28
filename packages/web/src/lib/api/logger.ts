import { HttpMethod } from "./types"

export enum LogLevel {
  NONE = 0,
  ERROR = 1,
  WARNING = 2,
  DEBUG = 3,
}

export class Logger {
  public level: LogLevel
  public prefix: string

  public constructor(level: LogLevel, prefix: string) {
    this.level = level
    this.prefix = prefix
  }

  public log(message: string, ...args: unknown[]): void {
    if (this.level >= LogLevel.DEBUG) {
      console.log(`[${this.prefix}]`, message, ...args)
    }
  }

  public warn(message: string, ...args: unknown[]): void {
    if (this.level >= LogLevel.WARNING) {
      console.warn(`[${this.prefix}]`, message, ...args)
    }
  }

  public error(error: Error): void {
    if (this.level >= LogLevel.ERROR) {
      console.error(`[${this.prefix}]`, error)
    }
  }
}

export class ApiLogger extends Logger {
  public constructor(level: LogLevel, method: HttpMethod, api: string) {
    super(level, `${method} ${api}`)
  }
}
