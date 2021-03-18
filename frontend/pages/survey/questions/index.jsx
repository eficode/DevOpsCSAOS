import React, { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useStore } from '../../../store'
import chunk from 'lodash/chunk'

import InnerContentWrapper from '../../../components/shared/InnerContentWrapper'
import QuestionGrouper from '../../../components/questionGrouper'
import ProgressBar from '../../../components/progressBar'
import { getAll as getAllQuestions } from '../../../services/questions'
import { useRouter, withRouter } from '../../../components/staticRouting'
import StyledLink from '../../../components/link'
import NavigationGroup from '../../../components/navigationGroup'

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50% 50%;
  grid-template-rows: 60px 60px;
  column-gap: 40px;
  row-gap: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
  width: 50%;

  button {
    cursor: pointer;
  }
`

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Montserrat;
  font-size: 16px;
  margin-bottom: 10px;
`

const SurveyPage = () => {
  const router = useRouter()
  const store = useStore()

  const pageId = Number(router.query.id)
  const questionsToRender = store.questionGroups[pageId-1]

  const optionsToPointsMap = useStore((state) => state.optionsToPointsMap)

  const nextPageHref = `/survey/questions/?id=${pageId + 1}`
  const previousPageHref = `/survey/questions/?id=${
    pageId - 1
  }`
  const summaryPageHref = '/survey/questions/summary'
  const isFinalPage = pageId === 2
  const isFirstPage = pageId === 1
  const storeHasQuestions = store.questions.length > 0
  
  useEffect(() => {
    ;(async () => {
      if (store.questions.length === 0) {
        const response = await getAllQuestions()
        store.setQuestions(response)
      }
    })()
  }, [])

  const updateSelections = (pointValue) => {
    const newSelections = [...store.selections]
    newSelections[questionId - 1] = pointValue
    store.setSelections(newSelections)
  }

  const handleAnswerSelection = (pointsAssociatedWithOption) => {
    updateSelections(pointsAssociatedWithOption)
    if (!isFinalQuestion) {
      router.push(nextQuestionHref, null, {
        shallow: true,
      })
    }
  }

  // this needs to be changed, but is here for placeholder
  if (!storeHasQuestions) {
    return <div>Loading questions...</div>
  }

  
  
  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ProgressBar />
      <InnerContentWrapper>
        <Heading>DevOps Assessment Tool</Heading>

        <QuestionGrouper questions={questionsToRender}> </QuestionGrouper>
        
        <NavigationGroup>
        {!isFirstPage ? (
          <StyledLink href={previousPageHref} passHref type="secondary">
            Previous
          </StyledLink>
        ) : null}
        {!isFinalPage ? (
          <StyledLink href={nextPageHref} passHref type="primary">
            Next
          </StyledLink>
        ) : null}
        </NavigationGroup>
        {isFinalPage ? <StyledLink type="primary" href={summaryPageHref}>Review</StyledLink> : null}
      </InnerContentWrapper>
    </>
  )
}

export default withRouter(SurveyPage)
