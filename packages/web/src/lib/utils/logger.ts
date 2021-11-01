/* eslint-disable no-console */

import { isDev } from "./env"

export enum LogLevel {
  NONE = 0,
  ERROR = 1,
  WARNING = 2,
  DEBUG = 3,
}

export const DEFAULT_LOG_LEVEL = isDev ? LogLevel.DEBUG : LogLevel.NONE

export class Logger {
  public level: LogLevel
  public prefix: string | undefined

  public constructor(prefix?: string, level: LogLevel = DEFAULT_LOG_LEVEL) {
    this.level = level
    this.prefix = prefix
  }

  public log(message: string, ...args: unknown[]): void {
    if (this.level >= LogLevel.DEBUG) {
      if (this.prefix) {
        console.log(`[${this.prefix}]`, message, ...args)
      } else {
        console.log(message, ...args)
      }
    }
  }

  public warn(message: string, ...args: unknown[]): void {
    if (this.level >= LogLevel.WARNING) {
      if (this.prefix) {
        console.warn(`[${this.prefix}]`, message, ...args)
      } else {
        console.warn(message, ...args)
      }
    }
  }

  public error(error: unknown): void {
    if (this.level >= LogLevel.ERROR) {
      if (this.prefix) {
        console.error(`[${this.prefix}]`, error)
      } else {
        console.error(error)
      }
    }
  }
}

export const Console = new Logger()