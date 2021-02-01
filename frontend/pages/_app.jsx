/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme';

const getStaticProps = async () => {
  const { data } = await axios.get('/api/questions');

  return {
    props: { questions: data },
  };
};

const MyApp = ({ Component }) => {
  const pageProps = getStaticProps();
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
