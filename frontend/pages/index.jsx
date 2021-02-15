/* eslint-disable max-len */
import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { ContentWrapper } from '../components/shared/ContentWrapper'
import Link from '../components/link'
import ProgressBar from '../components/progressBar'

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin-top: 30px;
`

const Main = styled.main`
  padding: 4rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Merriweather;

  p {
    text-align: center;
    line-height: 1.6;
    padding: 0.5rem;
    font-size: 16px;
  }

  h2 {
    font-size: 24px;
  }
`

const Home = () => (
  <>
    <Head>
      <title>DevOps Capability Survey</title>
    </Head>
    <ContentWrapper>
    <ProgressBar/>
      <Heading>DevOps Assessment Tool</Heading>
      <Main>
        <h2>Welcome!</h2>
        <p>Test your DevOps capabilities here.</p>
      </Main>
      <Link href='/survey/contact' type='primary'>
          Get started
      </Link>
    </ContentWrapper>
  </>
)

export default Home
