/* eslint-disable max-len */
import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'

import ContentWrapper from '../components/contentWrapper'

const Header = styled.header``
const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.blueDianne};
`

const Main = styled.main`
  padding: 5rem;
  background-color: #fff;

  p {
    text-align: center;
    line-height: 1.6;
    padding: 0.5rem;
  }

  button {
    padding: 1rem 1.5rem;
    background-color: ${({ theme }) => theme.colors.easternBlue};
  }
`

const Home = () => {
  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ContentWrapper>
        <Header>
          <Heading>DevOps Assessment Tool</Heading>
        </Header>
        <Main>
          <h1>Welcome!</h1>
          <p>Test your DevOps capabilities here.</p>
        </Main>

        <Link href="/survey/questions/1" passHref>
          Get started
        </Link>
      </ContentWrapper>
    </>
  )
}

export default Home
