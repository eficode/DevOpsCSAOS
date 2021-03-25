/* eslint-disable max-len */
import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { InnerContentWrapper } from '../components/shared/InnerContentWrapper'
import Link from '../components/link'
import ProgressBar from '../components/progressBar'
import { LinearProgress } from '@material-ui/core'

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.blueDianne};
  margin: 30px 0;

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
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </Head>
    <ProgressBar />
    <InnerContentWrapper>
      <Heading>DevOps Assessment Tool</Heading>
      <Main>
        <p>Welcome!</p>
        <p>Test your DevOps capabilities here.</p>
        <Link href='/survey/signup' type='primary'>
          Get started
        </Link>

      </Main>
    </InnerContentWrapper>
  </>
)

export default Home
