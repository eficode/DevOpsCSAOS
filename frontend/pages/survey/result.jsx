import React, { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Link from '../../components/link'
import { InnerContentWrapper } from '../../components/shared/InnerContentWrapper'
import Button from '../../components/button'
import TotalResult from '../../components/totalResult'
import ProgressBar from '../../components/progressBar'
import CategoryResult from '../../components/categoryResult'
import { useRouter } from 'next/router'
import { useStore } from '../../store'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0 0 0;
  width: 100%;
  position: absolute;
  top: 15px;
  background-color: white;
  border-radius: 0.5rem;
`

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

const Categories = styled.div`
  margin: auto;
  width: 70%;
`

const Home = () => {
  const store = useStore()

  const userResult = store.resultsPerCategory
    .map((score) => score.userResult)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  const maxResult = store.resultsPerCategory
    .map((score) => score.maxCategoryResult)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  return (
    <>
      <Head>
        <title>DevOps Capability Survey Results</title>
      </Head>
      <ProgressBar />
      <InnerContentWrapper>
        <Content>
          <Heading>DevOps Assessment Tool</Heading>
          <ResultsTitle>Your Results</ResultsTitle>
          <TotalResult userResult={userResult} maxResult={maxResult} />
          <Link href="/survey/result">
            <Button type="submit">
              Contact us!
            </Button>
          </Link>
          <Categories>
            {store.resultsPerCategory.map((result, index) => (
              <CategoryResult
                userResult={result.userResult}
                maxResult={result.maxCategoryResult}
                category={result.name}
                description={result.description}
                index={index}
              />
            ))}
          </Categories>
        </Content>
      </InnerContentWrapper>
    </>
  )
}

export default Home
