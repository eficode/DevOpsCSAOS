/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme';

const MyApp = ({ Component, pageProps }) => (
  <>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default MyApp;
