import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'
import Button from '../../components/button'

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.blueDianne};
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15rem;
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

const Result = styled.div`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.yellow};
  width: size;
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
        <p>Olet ruisleipä</p>
        <Link href="/survey/result">
          <Button type="submit">
            Contact !
          </Button>
        </Link>
      </Main>
    </ContentWrapper>
  </>
)

export default Home
