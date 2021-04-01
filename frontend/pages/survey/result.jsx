import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Link from '../../components/link'
import { InnerContentWrapper } from '../../components/shared/InnerContentWrapper'
import TotalResult from '../../components/totalResult'
import ProgressBar from '../../components/progressBar'
import CategoryResult from '../../components/categoryResult'
import TotalResultChart from '../../components/totalResultChart'
import { useStore } from '../../store'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
`

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Montserrat;
  font-size: 16px;
  margin-bottom: 10px;

  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.wideMobile}) {
    margin-top: 20px;
  }
`

const ResultsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 10px 0 30px 0;
`

const Categories = styled.div`
  width: 70%;

  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.wideMobile}) {
    width: 90%;
  }

  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.narrowMobile}) {
    width: 110%;
  }
`

const ResultsText = styled.h4`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Montserrat;
  font-size: 22px;
  padding-top: 20px;
`

const Home = () => {
  const [renderMobileLayout, setRenderMobileLayout] = useState(false)
  const store = useStore()
  console.log(store)

  const { userResult, maxResult, resultText, resultsPerCategory } = store

  console.log(store.resultsPerCategory)

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth <= 800
        ? setRenderMobileLayout(true)
        : setRenderMobileLayout(false)
    }

    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ProgressBar id={1} total={1} />
      <InnerContentWrapper>
        <Content>
          <Heading>DevOps Assessment Tool</Heading>
          <ResultsTitle>Your Results</ResultsTitle>
          <TotalResult userResult={userResult} maxResult={maxResult} />
          <ResultsText>{resultText}</ResultsText>
          <Link href="mailto:devops@leipalaari.fi" type="primary">
            Contact us!
          </Link>

          <Categories>
            {resultsPerCategory.map((result, index) => (
              <CategoryResult
                key={result.name}
                renderMobileLayout={renderMobileLayout}
                userResult={result.userPoints}
                maxResult={result.maxPoints}
                category={result.name}
                description={result.description}
                index={index}
              />
            ))}
          </Categories>
          <TotalResultChart
            data={store.resultsPerCategory}
            renderMobileLayout={renderMobileLayout}
          />
        </Content>
      </InnerContentWrapper>
    </>
  )
}

export default Home
