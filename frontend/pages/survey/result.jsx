import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Link from 'next/link'
import { ContentWrapper } from '../../components/shared/ContentWrapper'
import Button from '../../components/button'
import Results from '../../components/results'

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.blueDianne};
`
const Main = styled.main`
  padding: 5rem;
  background-color: #fff;

  p {
    text-align: center;
  }

  button {
    text-align: center;
    padding: 0rem 1.5rem;
    background-color: ${({ theme }) => theme.colors.easternBlue};
  }
`

const Home = () => (
  <>
    <Head>
      <title>DevOps Capability Survey Results</title>
    </Head>
    <ContentWrapper>
      <Heading>DevOps Assessment Tool</Heading>
      <Heading as="h2">Your Results</Heading>
      <Main>
        <Results />
        <p>Olet ruisleipä</p>
        <button>
          <Link href="#" passHref>
            <label>Contact us</label>
          </Link>
        </button>
      </Main>
    </ContentWrapper>
  </>
)

export default Home
