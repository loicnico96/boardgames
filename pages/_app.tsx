import { AppProps } from "next/app"
import Head from "next/head"
import React from "react"

import Layout from "components/Layout"

import "styles/globals.css"

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
