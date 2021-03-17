/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { ContentWrapper } from '../components/shared/ContentWrapper'
import { ProgressBar } from '../components/progressBar'
import GlobalStyles from '../styles/global'
import theme from '../styles/theme'
import '../public/fonts/fonts.css'



function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <ProgressBar />
        <ContentWrapper>
          <Component {...pageProps} />
        </ContentWrapper>
      </ThemeProvider>
    </>
  )
}

export default MyApp
