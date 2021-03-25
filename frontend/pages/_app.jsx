/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { StylesProvider } from '@material-ui/styles'
import { AnimatePresence } from 'framer-motion'
import { ContentWrapper } from '../components/shared/ContentWrapper'
import { ProgressBar } from '../components/progressBar'
import GlobalStyles from '../styles/global'
import theme from '../styles/theme'
import '../public/fonts/fonts.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <GlobalStyles />
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* <ProgressBar /> */}
          <ContentWrapper>
            <Component {...pageProps} />
          </ContentWrapper>
        </ThemeProvider>
      </StylesProvider>
    </AnimatePresence>
  )
}

export default MyApp
