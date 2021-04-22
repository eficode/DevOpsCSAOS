import React, { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { InnerContentWrapper } from '../../components/shared/InnerContentWrapper'
import TotalResult from '../../components/totalResult'
import ProgressBar from '../../components/progressBar'
import { useStore } from '../../store'
import ContentAnimationWrapper from '../../components/contentAnimationWrapper'
import Heading from '../../components/heading'
import ShareResultsGroup from '../../components/shareResultsGroup'
import GetDetailedResultsForm from '../../components/getDetailedResultsForm'
import { getIndustries } from '../../services/routes'

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

  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.wideMobile}) {
        padding-left: 8%;
        padding-right: 8%;
  }

`

const StyledHeading = styled(Heading)`
  font-size: 0.75rem;
  margin-bottom: 1rem;
`

const StyledResultsLabel = styled(Heading)`
  margin-bottom: 1rem;
`

const ResultSummaryText = styled.section`
  text-align: center;
  padding: 15px 0 30px 0;
  line-height: 1.6;
  font-size: 16px;
  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.wideMobile}) {
    text-align: left;
  }
`

const Home = () => {
  const store = useStore()

  useEffect(() => {
    (async () => {
      if (store.industries.length === 0) {
        try {
          const response = await getIndustries()

          store.setIndustries(response)
        } catch (error) {
          console.error(error)
        }
      }
    })()
  }, [])

  if (!store.results) {
    return <div>loading results...</div>
  }

  const { maxPoints, userPoints, text } = store.results.surveyResult
  const { categories, userBestInCategory, userWorstInCategory } = store.results
  const { industries } = store

  const convertArrayOfCategoriesToString = () => {
    let str = `${categories[0]}`
    categories.slice(1, categories.length - 1).forEach((category) => {
      str += `, ${category}`
    })
    str += ` and ${categories[categories.length - 1]}`

    return str
  }

  const listOfCategories = convertArrayOfCategoriesToString()

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
            <ResultSummaryText data-testid="summarytext">
              The tool assesses your DevOps capabilities in different categories 
              based on your answers. We have assessed your capabilities in
              categories <strong>{listOfCategories}</strong>. Your highest score was in the category
              <strong>{' '}{userBestInCategory}</strong>, whereas you scored lowest in <strong>{userWorstInCategory}</strong>.
              Fill in the form below to get your detailed
              results by email and see how to improve your skills. You can also
              compare your results with others in your industry or in the
              selected reference group.
            </ResultSummaryText>
            <ShareResultsGroup
              text={text}
              userPoints={userPoints}
              maxPoints={maxPoints}
            />
            <GetDetailedResultsForm industries={industries}/>
          </Content>
        </ContentAnimationWrapper>
      </InnerContentWrapper>
    </>
  )
}

export default Home
