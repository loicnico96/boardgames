import styled from "@emotion/styled"

import { Spinner } from "Components/Interface/Spinner"
import { PageContent } from "Components/Layout/PageContent"
import { Text } from "Components/Typography/Text"

export type PageLoaderProps = {
  message?: string
}

const PageLoaderContainer = styled(PageContent)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export function PageLoader({ message }: PageLoaderProps) {
  return (
    <PageLoaderContainer>
      <Spinner size={96} />
      {!!message && <Text>{message}</Text>}
    </PageLoaderContainer>
  )
}

export function renderLoader(message?: string): JSX.Element {
  return <PageLoader message={message} />
}
