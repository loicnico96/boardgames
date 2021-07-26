/* eslint-disable no-console */

import { isDev } from "lib/utils/env"

import { HttpMethod } from "./types"

export enum LogLevel {
  NONE = 0,
  ERROR = 1,
  WARNING = 2,
  DEBUG = 3,
}

export class ApiLogger {
  public api: string
  public level: LogLevel
  public method: string

  public constructor(
    method: HttpMethod,
    api: string,
    level: LogLevel = isDev ? LogLevel.DEBUG : LogLevel.NONE
  ) {
    this.api = api
    this.level = level
    this.method = method
  }

  public get prefix() {
    return `[${this.method} ${this.api}]`
  }

  public log(message: string, ...params: unknown[]): void {
    if (this.level >= LogLevel.DEBUG) {
      console.log(`${this.prefix} ${message}`, ...params)
    }
  }

  public warn(message: string, ...params: unknown[]): void {
    if (this.level >= LogLevel.WARNING) {
      console.warn(`${this.prefix} ${message}`, ...params)
    }
  }

  public error(error: Error): void {
    if (this.level >= LogLevel.ERROR) {
      console.error(`${this.prefix} Error:`, error)
    }
  }
}
