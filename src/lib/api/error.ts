import { HttpStatus } from "./types"

export class ApiError extends Error {
  statusCode: HttpStatus

  constructor(statusCode: HttpStatus, message: string) {
    super(message)
    this.name = `ApiError (${statusCode})`
    this.statusCode = statusCode
  }
}
