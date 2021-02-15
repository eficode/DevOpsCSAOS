/* eslint-disable max-len */
import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { ContentWrapper } from '../components/shared/ContentWrapper'
import Link from '../components/link'
import ProgressBar from '../components/progressBar'

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.blueDianne};
  margin-top: 30px;
`

const Main = styled.main`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Home = () => (
  <>
    <Head>
      <title>DevOps Capability Survey</title>
    </Head>
    <ProgressBar/>
    <ContentWrapper>
      <Heading>DevOps Assessment Tool</Heading>
      <Main>
        <h2>Welcome!</h2>
        <p>Test your DevOps capabilities here.</p>
        <Link href='/survey/contact' type='primary'>
          Get started
        </Link>
      </Main>
    </ContentWrapper>
  </>
)

export default Home
