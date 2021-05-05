import { ObjectRecord } from "./objects"

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

export function isBoolean(value: unknown): value is boolean {
  return Boolean(value) === value
}

export function isNumber(value: unknown): value is number {
  return Number.isFinite(value)
}

export function isObject(value: unknown): value is ObjectRecord {
  return typeof value === "object" && value !== null
}

export function isString(value: unknown): value is string {
  return typeof value === "string"
}
