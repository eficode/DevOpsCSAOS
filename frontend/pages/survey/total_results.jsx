/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { InnerContentWrapper } from '../../components/shared/InnerContentWrapper'
import TotalResult from '../../components/totalResult'
import { ProgressBar } from '../../components/progressBar'
import CategoryResult from '../../components/categoryResult'
import TotalResultBarChart from '../../components/totalResultBarChart'
import TotalResultRadarChart from '../../components/totalResultRadarChart'
import { useStore } from '../../store'
import { ContentAnimationWrapper } from '../../components/contentAnimationWrapper'
import Heading from '../../components/heading'

const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
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

const StyledHeading = styled(Heading)`
  font-size: 0.75rem;
  margin-bottom: 1rem;
`
const StyledResultsLabel = styled(Heading)`
  margin-bottom: 1rem;
`

const Home = () => {
  const [renderMobileLayout, setRenderMobileLayout] = useState(false)
  const [renderMobileChart, setRenderMobileChart] = useState(false)
  const store = useStore()

  if (!store.detailedResults) {
    return <div>loading results...</div>
  }

  const { maxPoints, userPoints, text } = store.detailedResults.surveyResult
  const { categoryResults } = store.detailedResults
  const { featureToggleSwitch } = store.featureToggleSwitch

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth <= 800
        ? setRenderMobileLayout(true)
        : setRenderMobileLayout(false)
      window.innerWidth <= 1000
        ? setRenderMobileChart(true)
        : setRenderMobileChart(false)
    }

    window.addEventListener('resize', handleResize)
  }, [])

  // add % out of maxes to categories for charts
  const percentages = categoryResults.map((category) => ({
    userPerCentOutOfMax: category.userPoints / category.maxPoints,
    groupPerCentOutOfMax: category.groupAverage / category.maxPoints,
    industryPerCentOutOfMax: category.industryAverage / category.maxPoints,
    maxPercentage: 1,
    ...category,
  }))

  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ProgressBar id={1} total={1} />
      <InnerContentWrapper>
        <ContentAnimationWrapper>
          <Content>
            <StyledHeading component="h1" variant="h6" font="Montserrat">
              DevOps Assessment Tool
            </StyledHeading>
            <StyledResultsLabel component="h2" variant="h5">
              Your Results
            </StyledResultsLabel>
            <TotalResult userResult={userPoints} maxResult={maxPoints} />
            <Heading component="h3" variant="h6" font="Montserrat">
              {text}
            </Heading>
            <Categories data-testid="categorycontainer">
              {categoryResults.map((result, index) => (
                <CategoryResult
                  key={result.name}
                  renderMobileLayout={renderMobileLayout}
                  userResult={result.userPoints}
                  maxResult={result.maxPoints}
                  category={result.name}
                  description={result.description}
                  resultText={result.text}
                  index={index}
                />
              ))}
            </Categories>
            {featureToggleSwitch === "B" ? (
              <TotalResultRadarChart data={percentages} />
            ) : (
              <TotalResultBarChart
                data={percentages}
                renderMobileLayout={renderMobileChart}
              />
            )}
          </Content>
        </ContentAnimationWrapper>
      </InnerContentWrapper>
    </>
  )
}

export default Home
