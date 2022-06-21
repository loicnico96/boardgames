import styled from "@emotion/styled"

export type UserAvatarProps = {
  imageUrl?: string
  size: number
}

export const UserAvatar = styled.div<UserAvatarProps>`
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : "#2224")};
  background-size: contain;
  border-radius: ${props => props.size / 2}px;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`
