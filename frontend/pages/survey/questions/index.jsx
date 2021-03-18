import React, { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useStore } from '../../../store'

import InnerContentWrapper from '../../../components/shared/InnerContentWrapper'
import QuestionGrouper from '../../../components/questionGrouper'
import ProgressBar from '../../../components/progressBar'
import { getAll as getAllQuestions } from '../../../services/questions'
import { useRouter, withRouter } from '../../../components/staticRouting'
import StyledLink from '../../../components/link'
import NavigationGroup from '../../../components/navigationGroup'

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

  // this needs to be updated take multi-question page into account
  const handleAnswerSelection = (pointsAssociatedWithOption) => {
    updateSelections(pointsAssociatedWithOption)
    if (!isFinalQuestion) {
      router.push(nextQuestionHref, null, {
        shallow: true,
      })
    }
  }
  console.log(store.selections)

  // this needs to be changed, but is here for placeholder
  if (!storeHasQuestions) {
    return <div>Loading questions...</div>
  }

  const countOfAnsweredQuestions = store.selections.reduce(
    (accumulator, selection) =>
      selection.value !== undefined ? accumulator + 1 : accumulator,
    0
  )

  const total = store.questions.length

  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ProgressBar answered={countOfAnsweredQuestions} total={total} />
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
