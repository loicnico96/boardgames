import { Box, BoxProps } from "Components/Primitives/Box"
import { Text } from "Components/Typography/Text"

export type UserInfoProps = Omit<BoxProps, "children"> & {
  userName: string
}

export function UserInfo({ userName, ...props }: UserInfoProps) {
  return (
    <Box {...props}>
      <Text>{userName}</Text>
    </Box>
  )
}
