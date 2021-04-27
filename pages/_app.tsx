import { AppProps } from "next/app"
import Head from "next/head"
import React from "react"

import Layout from "components/Layout"
import AuthProvider from "components/providers/AuthProvider"
import ToastProvider from "components/providers/ToastProvider"
import { StoreProvider } from "lib/store/context"

import "styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <StoreProvider>
        <AuthProvider>
          <Layout>
            <Head>
              <title>App</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </StoreProvider>
    </ToastProvider>
  )
}
