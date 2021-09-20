import { CSSProperties } from "react"

export type CSSDimension<Unit extends string> = `${number}${Unit}` | number

export type StyleProps = {
  // Dimensions
  height?: CSSDimension<"%">
  width?: CSSDimension<"%">

  // Margins
  margin?: CSSDimension<"%">
  marginHorizontal?: CSSDimension<"%">
  marginVertical?: CSSDimension<"%">
  marginLeft?: CSSDimension<"%">
  marginRight?: CSSDimension<"%">
  marginTop?: CSSDimension<"%">
  marginBottom?: CSSDimension<"%">

  // Paddings
  padding?: CSSDimension<"%">
  paddingHorizontal?: CSSDimension<"%">
  paddingVertical?: CSSDimension<"%">
  paddingLeft?: CSSDimension<"%">
  paddingRight?: CSSDimension<"%">
  paddingTop?: CSSDimension<"%">
  paddingBottom?: CSSDimension<"%">

  // Flex
  flex?: number

  // Others
  style?: CSSProperties
}

export type ComputedStyleProps<T extends StyleProps> = Omit<
  T,
  keyof StyleProps
> & {
  style: CSSProperties
}

export function computeStyleProps<T extends StyleProps>(
  props: T
): ComputedStyleProps<T> {
  const {
    // Dimensions
    height,
    width,
    // Margins
    margin,
    marginHorizontal,
    marginVertical,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    // Paddings
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    // Flex
    flex,
    // Others
    style,
    ...rest
  } = props

  return {
    style: {
      // Dimensions
      height,
      width,
      // Margins
      margin,
      marginLeft: marginLeft ?? marginHorizontal,
      marginRight: marginRight ?? marginHorizontal,
      marginTop: marginTop ?? marginVertical,
      marginBottom: marginBottom ?? marginVertical,
      // Paddings
      padding,
      paddingLeft: paddingLeft ?? paddingHorizontal,
      paddingRight: paddingRight ?? paddingHorizontal,
      paddingTop: paddingTop ?? paddingVertical,
      paddingBottom: paddingBottom ?? paddingVertical,
      // Flex
      flex,
      // Others
      ...style,
    },
    ...rest,
  }
}
