import styled from "@emotion/styled"
import { ReactNode } from "react"

export type PageHeaderProps = {
  children: ReactNode
}

export const PageHeader = styled.div<PageHeaderProps>`
  align-items: center;
  background-color: ${props => props.theme.colors.secondary};
  column-gap: 8px;
  display: flex;
  height: 64px;
  padding: 16px 48px;
`
