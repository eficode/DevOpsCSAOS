/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react'
import { ThemeProvider } from 'styled-components'
import getAll from '../services/questions'
import { useStore } from '../store'
import GlobalStyles from '../styles/global'
import theme from '../styles/theme'

function MyApp({ Component, pageProps, questions }) {
  // set the questions to state as we transition to client-side
  useStore.setState({ questions: questions })

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

MyApp.getInitialProps = async () => {
  // fetch all questions and pass them to top-level app
  const questions = await getAll()
  return { questions }
}

export default MyApp
