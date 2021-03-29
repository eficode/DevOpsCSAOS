/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { StylesProvider } from '@material-ui/styles'
import { ContentWrapper } from '../components/shared/ContentWrapper'
import GlobalStyles from '../styles/global'
import theme from '../styles/theme'
import '../public/fonts/fonts.css'
import PageTransition from '../components/pageTransition'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <GlobalStyles />
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <PageTransition>
            <ContentWrapper>
              <Component {...pageProps} />
            </ContentWrapper>
          </PageTransition>
        </ThemeProvider>
      </StylesProvider>
    </>
  )
}

export default MyApp
