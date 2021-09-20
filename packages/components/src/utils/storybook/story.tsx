import { ComponentStory } from "@storybook/react"
import { ComponentType } from "react"

import { ThemeProvider } from "utils/theme"

import {
  Controls,
  getArgs,
  getArgTypes,
  ActionProps,
  ControlProps,
} from "./controls"
import { getParameters, ParameterOptions } from "./parameters"

export type StoryOptions<
  T extends Controls = {},
  P extends ControlProps<T> = {}
> = ParameterOptions & {
  controls?: T
  defaults?: P
  name?: string
} & ({} extends T ? {} : { controls: T }) &
  ({} extends P ? {} : { defaults: P })

export type Story<
  T extends Controls = {},
  P extends ControlProps<T> = {}
> = ComponentStory<ComponentType<ControlProps<T>>> & {
  controls: T
  defaults: P
}

export function story<T extends Controls = {}, P extends ControlProps<T> = {}>(
  Component: ComponentType<ControlProps<T> & ActionProps<T> & P>,
  {
    controls = {} as T,
    defaults = {} as P,
    name,
    ...options
  }: StoryOptions<T, P>
): Story<T, P> {
  const result = (props: ControlProps<T>) => (
    <ThemeProvider>
      <Component
        {...defaults}
        {...(props as ControlProps<T> & ActionProps<T>)}
      />
    </ThemeProvider>
  )

  result.args = getArgs(controls, defaults)
  result.argTypes = getArgTypes(controls)
  result.controls = controls
  result.defaults = defaults
  result.parameters = getParameters(options)
  result.storyName = name

  return result
}
