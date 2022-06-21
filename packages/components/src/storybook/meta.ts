import { ComponentMeta } from "@storybook/react"
import { ComponentProps, ComponentType } from "react"

import { getParameters, ParameterOptions } from "./parameters"

export type MetaOptions = ParameterOptions & {
  group: string
  name?: string
}

export function meta<C extends ComponentType<ComponentProps<C>>>(
  Component: C,
  { group, name = Component.name, ...options }: MetaOptions
): ComponentMeta<C> {
  return {
    parameters: getParameters(options),
    title: `${group}/${name}`,
  }
}
