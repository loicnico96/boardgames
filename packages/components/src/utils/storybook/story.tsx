import { ComponentStory } from "@storybook/react"
import { ComponentProps, ComponentType } from "react"

import { defaultTheme, ThemeProvider } from "utils/theme"

import {
  Controls,
  getArgs,
  getArgTypes,
  ActionProps,
  ControlProps,
} from "./controls"
import { getParameters, ParameterOptions } from "./parameters"

export type StoryOptions = ParameterOptions & {
  name?: string
}

export type Story<
  C extends ComponentType<ControlProps<T> & ActionProps<T> & P>,
  T extends Controls,
  P extends ControlProps<T> = {}
> = ComponentStory<
  ComponentType<Partial<ComponentProps<C> & ControlProps<T> & ActionProps<T>>>
> & {
  controls: T
  defaults: P
}

export function story<
  C extends ComponentType<ControlProps<T> & ActionProps<T> & P>,
  T extends Controls,
  P extends ControlProps<T>
>(
  Component: C,
  options: StoryOptions & {
    controls: T
    defaults: P
  }
): Story<C, T, P>

export function story<
  C extends ComponentType<ControlProps<T> & ActionProps<T>>,
  T extends Controls
>(
  Component: C,
  options: StoryOptions & {
    controls: T
  }
): Story<C, T>

export function story<C extends ComponentType<P>, P>(
  Component: C,
  options: StoryOptions & {
    defaults: P
  }
): Story<C, {}, P>

export function story<C extends ComponentType<{}>>(
  Component: C,
  options?: StoryOptions
): Story<C, {}>

export function story<T extends Controls, P extends ControlProps<T>>(
  Component: ComponentType<ControlProps<T> & ActionProps<T> & P>,
  {
    controls = {} as T,
    defaults = {} as P,
    name = Component.name,
    ...options
  }: StoryOptions & {
    controls?: T
    defaults?: P
  } = {}
) {
  const result = (props: ControlProps<T> & ActionProps<T>) => (
    <ThemeProvider theme={defaultTheme}>
      <Component {...defaults} {...props} />
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
