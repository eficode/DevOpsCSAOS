import React, { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Link from 'next/link'
import { ContentWrapper } from '../../components/shared/ContentWrapper'
import Button from '../../components/button'
import TotalResult from '../../components/totalResult'
import ProgressBar from '../../components/progressBar'
import { useRouter } from 'next/router'
import { useStore } from '../../store'

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Montserrat;
  font-size: 16px;
  margin-bottom: 10px;
`
const ResultsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 10px 0 30px 0;
`
const Main = styled.main`
  padding: 5rem;
  background-color: #fff;

  p {
    text-align: center;
    font-family: Merriweather;
  }

  button {
    text-align: center;
    padding: 0rem 1.5rem;
    background-color: ${({ theme }) => theme.colors.easternBlue};
  }
`

const Home = () => {
  const store = useStore()

  const userResult = store.resultsPerCategory
    .map((score) => score.userResult)
    .reduce((accumulator, currentValue) => accumulator + currentValue)
  const maxResult = store.resultsPerCategory
    .map((score) => score.maxCategoryResult)
    .reduce((accumulator, currentValue) => accumulator + currentValue)

  return (
    <>
      <Head>
        <title>DevOps Capability Survey Results</title>
      </Head>
      <ContentWrapper>
        <ProgressBar />
        <Heading>DevOps Assessment Tool</Heading>
        <ResultsTitle>Your Results</ResultsTitle>
        <TotalResult userResult={userResult} maxResult={maxResult} />
        <Main>
          {store.resultsPerCategory.map((result, index) => (
            <p key={index}>
              {`${result.name}: ${result.userResult}/${result.maxCategoryResult}`}
            </p>
          ))}
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
