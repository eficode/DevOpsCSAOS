/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { ContentWrapper } from '../components/shared/ContentWrapper'
import { ProgressBar } from '../components/progressBar'
import GlobalStyles from '../styles/global'
import theme from '../styles/theme'
import '../public/fonts/fonts.css'
import { StylesProvider } from '@material-ui/styles'
import {
  ThemeProvider as MaterialThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const materielUiTheme = createMuiTheme({
    overrides: {
      MuiTypography: {
        h1: { fontSize: '2.5rem' },
        h2: { fontSize: '2rem' },
        h3: { fontSize: '1.75rem' },
        h4: { fontSize: '1.5rem' },
        h5: { fontSize: '1.25rem' },
        h6: { fontSize: '1rem' },
      },
    },
  })

  return (
    <>
      <GlobalStyles />
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MaterialThemeProvider theme={materielUiTheme}>
            {/* <ProgressBar /> */}
            <ContentWrapper>
              <Component {...pageProps} />
            </ContentWrapper>
          </MaterialThemeProvider>
        </ThemeProvider>
      </StylesProvider>
    </>
  )
}

export default MyApp
