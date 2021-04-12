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
import GetDetailedResultsForm from '../../components/getDetailedResultsForm'

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

const StyledResultHeading = styled(Heading)`
  font-size: 1rem;
  margin-top: 1rem;
`

const ResultSummaryText = styled.p``

const Home = () => {
  const store = useStore()

  if (!store.results) {
    return <div>loading results...</div>
  }

  const { maxPoints, userPoints, text } = store.results.surveyResult
  const { categories, userBestInCategory, userWorstInCategory } = store.results

  const convertArrayOfCategoriesToString = () => {
    let str = `${categories[0]}`
    categories.slice(1, categories.length - 1).forEach((c) => {
      str += `, ${c}`
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
            <ResultSummaryText>
              The tool assesses your DevOps capabilities in different categories
              based on your answers. We have assessed your capabilities in
              categories {listOfCategories}. You had highest score in category{' '}
              {userBestInCategory}, whereas your score in {userWorstInCategory}{' '}
              was the lowest. Fill in the form below to get your detailed
              results by email to see how to improve your skills. You can also
              compare your results with others in your business or in the
              selected reference group.
            </ResultSummaryText>
            <ShareResultsGroup />
            <GetDetailedResultsForm />
          </Content>
        </ContentAnimationWrapper>
      </InnerContentWrapper>
    </>
  )
}

export default Home
