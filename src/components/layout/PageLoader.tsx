import styled from "@emotion/styled"

import Spinner from "components/ui/Spinner"

import PageContent from "./PageContent"

export type PageLoaderProps = {
  message?: string
}

const PageLoaderContainer = styled(PageContent)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default function PageLoader({ message }: PageLoaderProps) {
  return (
    <PageLoaderContainer>
      <Spinner size={96} />
      {!!message && <div>{message}</div>}
    </PageLoaderContainer>
  )
}

export function renderLoader(message?: string): JSX.Element {
  return <PageLoader message={message} />
}
