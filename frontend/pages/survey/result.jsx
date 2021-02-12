import React, { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Link from 'next/link'
import Button from '../../components/button'
import { useRouter } from 'next/router'
import { useStore } from '../../store'

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

const Result = styled.div`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.yellow};
  width: size;
`

const Home = () => {
  const store = useStore()
  
  return (
    <>
      <Head>
        <title>DevOps Capability Survey Results</title>
      </Head>
      <ContentWrapper>
        <Heading>DevOps Assessment Tool</Heading>
        <Heading as="h2">Your Results</Heading>
        <Main>
          {store.resultsPerCategory.map((result, index) => 
          <p key={index}>
            {`${result.name}: ${result.userResult.toFixed(1)}/${result.maxCategoryResult.toFixed(1)}`}
          </p>
          )}
          <Link href="/survey/result">
            <Button type="submit">
              Contact !
            </Button>
          </Link>
        </Main>
      </ContentWrapper>
    </>
  )
}

export default Home
