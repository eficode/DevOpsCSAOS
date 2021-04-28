import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Link from '../../components/link'
import { InnerContentWrapper } from '../../components/shared/InnerContentWrapper'
import TotalResult from '../../components/totalResult'
import ProgressBar from '../../components/progressBar'
import CategoryResult from '../../components/categoryResult'
import TotalResultBarChart from '../../components/totalResultBarChart'
import TotalResultRadarChart from '../../components/totalResultRadarChart'
import { useStore } from '../../store'
import ContentAnimationWrapper from '../../components/contentAnimationWrapper'
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

const mockData = {
  surveyResult: {
    maxPoints: 100,
    userPoints: 80,
    text: 'You did semi ok!',
    groupAverage: 99,
    industryAverage: 45,
  },
  categoryResults: [
    {
      name: 'COolNess',
      userPoints: 12,
      groupAverage: 15,
      industryAverage: 18,
      maxPoints: 20,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      name: 'Kiva',
      userPoints: 22,
      groupAverage: 15,
      industryAverage: 18,
      maxPoints: 25,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      name: 'Kova',
      userPoints: 8,
      maxPoints: 10,
      groupAverage: 5,
      industryAverage: 8,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      name: 'JEOUaujee',
      userPoints: 12,
      maxPoints: 40,
      groupAverage: 38,
      industryAverage: 8,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      name: 'Ihan siistiä!',
      userPoints: 15,
      maxPoints: 15,
      groupAverage: 15,
      industryAverage: 8,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ],
}

const Home = () => {
  const [renderMobileLayout, setRenderMobileLayout] = useState(false)
  const store = useStore()

  if (!store.results) {
    return <div>loading results...</div>
  }

  const { maxPoints, userPoints, text } = mockData.surveyResult
  const categoryResults = mockData.categoryResults
  const featureToggleSwitch = store.featureToggleSwitch

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth <= 800
        ? setRenderMobileLayout(true)
        : setRenderMobileLayout(false)
    }

    window.addEventListener('resize', handleResize)
    ;(async () => {
      store.resetVersion()
      const url = new URLSearchParams(window.location.search)
      const version = url.get('version')
      if (version) {
        store.setFeatureToggleSwitch(version)
      }
    })()
  }, [])

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
            <Heading component="h3" variant="" font="Montserrat">
              {text}
            </Heading>
            {
              <Categories>
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
            }
            {(() => {
              if (featureToggleSwitch === 'A') {
                return (
                  <TotalResultBarChart
                    data={categoryResults}
                    renderMobileLayout={renderMobileLayout}
                  />
                )
              }
              if (featureToggleSwitch === 'B') {
                return <TotalResultRadarChart data={categoryResults} />
              }
            })()}
          </Content>
        </ContentAnimationWrapper>
      </InnerContentWrapper>
    </>
  )
}

export default Home
