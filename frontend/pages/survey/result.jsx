import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { InnerContentWrapper } from '../../components/shared/InnerContentWrapper'
import TotalResult from '../../components/totalResult'
import ProgressBar from '../../components/progressBar'
import { useStore } from '../../store'
import ContentAnimationWrapper from '../../components/contentAnimationWrapper'
import Heading from '../../components/heading'
import ShareResultsGroup from '../../components/shareResultsGroup'

const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  padding-left: 15%;
  padding-right: 15%;
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
`

const StyledHeading = styled(Heading)`
  font-size: 0.75rem;
  margin-bottom: 1rem;
`
const StyledResultsLabel = styled(Heading)`
  margin-bottom: 1rem;
`

const ResultSummaryText = styled.p`
`

const Home = () => {
  const store = useStore()
  const { userResult, maxResult, resultText } = store

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
            <TotalResult userResult={userResult} maxResult={maxResult} />
            <Heading component="h3" variant="" font="Montserrat">
              {resultText}
            </Heading>
            <ResultSummaryText>
              hyvä saate mainostekstiLorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
              dolore eu fugiat nulla pariatur.
            </ResultSummaryText>
            <ShareResultsGroup/>
            <p>formi emailille...</p>
          </Content>
        </ContentAnimationWrapper>
      </InnerContentWrapper>
    </>
  )
}

export default Home
