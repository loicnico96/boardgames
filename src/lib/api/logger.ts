/* eslint-disable no-console */

import { NextApiRequest } from "next"

export class ApiLogger {
  public readonly prefix: string

  public constructor(req: NextApiRequest) {
    this.prefix = `[${req.method} ${req.url}]`
  }

  public log(message: string, ...params: unknown[]): void {
    console.log(`${this.prefix} ${message}`, ...params)
  }

  public warn(message: string, ...params: unknown[]): void {
    console.warn(`${this.prefix} ${message}`, ...params)
  }

  public error(error: Error): void {
    console.error(this.prefix, error)
  }
}
