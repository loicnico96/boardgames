import styled from "@emotion/styled"
import { ReactNode } from "react"

export type PageContentProps = {
  children: ReactNode
}

export const PageContent = styled.div<PageContentProps>`
  flex: 1;
  padding: 24px 48px;
`
