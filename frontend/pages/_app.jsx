/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { ContentWrapper } from '../components/shared/ContentWrapper'
import GlobalStyles from '../styles/global'
import theme from '../styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <ContentWrapper>
          <Component {...pageProps} />
        </ContentWrapper>
      </ThemeProvider>
    </>
  )
}

export default MyApp
