import styled from "@emotion/styled"
import { ArgTypes, ComponentMeta, ComponentStory } from "@storybook/react"
import { ComponentProps, ComponentType } from "react"

export type Control<T> = T extends (...args: any[]) => any
  ? "fn"
  : T extends boolean
  ? "boolean"
  : T extends number
  ? "number" | "range" | number[]
  : T extends string
  ? "text" | "date" | "color" | string[]
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
    <Component {...defaultProps} />
  )

  result.args = props

  return result
}

const StoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Nunito Sans", "Segoe UI", Helvetica, Arial, sans-serif;
`

export function stories<T extends ComponentType<ComponentProps<T>>>(
  Component: T,
  props: Record<string, Partial<ComponentProps<T>>>
): ComponentStory<T> {
  const result: ComponentStory<T> = (defaultProps: ComponentProps<T>) => (
    <StoriesContainer>
      {Object.keys(props).map(name => (
        <div key={name}>
          <h3>{name}</h3>
          <Component {...defaultProps} {...props[name]} />
        </div>
      ))}
    </StoriesContainer>
  )

  return result
}
