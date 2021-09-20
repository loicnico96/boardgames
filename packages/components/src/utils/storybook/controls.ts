import { ArgTypes } from "@storybook/react"

import { defaultTheme, ThemeColor } from "utils/theme"

export type ControlType =
  | "boolean"
  | "color"
  | "date"
  | "number"
  | "string"
  | "themeColor"

export type ControlOption = number | string

export type Control = ControlType | ControlOption[] | "fn"

export type Controls = Record<string, Control>

export type ControlProp<T extends ControlType> = {
  boolean: boolean
  color: string
  date: string
  number: number
  string: string
  themeColor: ThemeColor
}[T]

export type ControlProps<T extends Controls> = {
  [K in keyof T as T[K] extends "fn" ? never : K]?: T[K] extends ControlType
    ? ControlProp<T[K]>
    : T[K][number]
}

export type ActionProps<T extends Controls> = {
  [K in keyof T as T[K] extends "fn" ? K : never]: (...args: any[]) => any
}

export function prettyName(name: string): string {
  return name.slice(0, 1).toUpperCase().concat(name.slice(1))
}

export function getArgType(name: string, control: Control): ArgTypes[string] {
  if (Array.isArray(control)) {
    return {
      options: control,
      control: {
        type: control.length > 3 ? "select" : "radio",
      },
      name: prettyName(name),
    }
  }

  if (control === "fn") {
    return {
      action: name,
      table: {
        disable: true,
      },
    }
  }

  if (control === "string") {
    return {
      control: "text",
      name: prettyName(name),
    }
  }

  if (control === "themeColor") {
    return {
      options: Object.keys(defaultTheme.colors),
      control: {
        type: "radio",
      },
      name: prettyName(name),
    }
  }

  return {
    control,
    name: prettyName(name),
  }
}

export function getArgTypes<T extends Controls>(controls: T): ArgTypes {
  const result: ArgTypes = {}

  for (const name in controls) {
    result[name] = getArgType(name, controls[name])
  }

  return result
}

export function getArgs<T extends Controls, P extends ControlProps<T> = {}>(
  controls: T,
  defaults: P
): P {
  return (Object.keys(controls) as (keyof P)[]).reduce((result, name) => {
    result[name] = defaults[name]
    return result
  }, {} as P)
}
