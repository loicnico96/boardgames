import { ArgTypes, ComponentMeta, ComponentStory } from "@storybook/react"
import { ComponentProps, ComponentType } from "react"

import { defaultTheme, ThemeProvider } from "utils/theme"

export type Control<T> = T extends (...args: any[]) => any
  ? "fn"
  : T extends boolean
  ? "boolean"
  : T extends number
  ? "number" | "range" | number[]
  : T extends string
  ? "string" | "date" | "color" | "themeColor" | string[]
  : never

export type Controls<T extends Record<string, any>> = {
  [K in keyof T]?: Control<T[K]>
}

export function meta<T extends ComponentType<ComponentProps<T>>>(
  Component: T,
  {
    group,
    controls = {},
    defaults = {},
  }: {
    group: string
    controls?: Controls<ComponentProps<T>>
    defaults?: Partial<ComponentProps<T>>
  }
): ComponentMeta<T> {
  const argTypes: ArgTypes = {}

  for (const name in controls) {
    const control = controls[name]

    if (control === "fn") {
      argTypes[name] = {
        action: name,
        table: { disable: true },
      }
    } else if (control === "string") {
      argTypes[name] = {
        control: "text",
      }
    } else if (control === "themeColor") {
      argTypes[name] = {
        control: {
          options: Object.keys(defaultTheme.colors),
          type: "radio",
        },
      }
    } else if (Array.isArray(control)) {
      argTypes[name] = {
        control: {
          options: control,
          type: control.length > 3 ? "select" : "radio",
        },
      }
    } else {
      argTypes[name] = {
        control,
      }
    }
  }

  return {
    title: `${group}/${Component.name}`,
    args: defaults,
    argTypes,
  }
}

export function story<T extends ComponentType<ComponentProps<T>>>(
  Component: T,
  props: Partial<ComponentProps<T>> = {}
): ComponentStory<T> {
  const result: ComponentStory<T> = (defaultProps: ComponentProps<T>) => (
    <ThemeProvider>
      <Component {...defaultProps} />
    </ThemeProvider>
  )

  result.args = props

  return result
}
