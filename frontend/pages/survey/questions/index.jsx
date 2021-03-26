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
import { allQuestionsAnswered, countOfAnsweredQuestions } from '../../../utils'

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Montserrat;
  font-size: 16px;
  margin-bottom: 10px;

  @media screen and (max-width: ${({theme}) => theme.breakpoints.wideMobile}) {
    margin: 30px 0 -30px 0;
  }
`

const SurveyPage = () => {
  const router = useRouter()
  const store = useStore()
  
  const pageId = Number(router.query.id)
  const questionsToRender = store.questionGroups[pageId-1]

  const nextPageHref = `/survey/questions/?id=${pageId + 1}`
  const previousPageHref = `/survey/questions/?id=${
    pageId - 1
  }`
  const summaryPageHref = '/survey/questions/summary'

  const isFinalPage = pageId === store.questionGroups.length
  const isFirstPage = pageId === 1
  const storeHasQuestions = store.questions.length > 0
  
  useEffect(() => {
    ;(async () => {
      if (store.questions.length === 0) {
        try {
          const surveyId = 1
          const response = await getAllQuestions(surveyId)
          
          store.setQuestions(response)
        } catch (error) {
          console.log(error)
        }
        // 
      }
    })()
  }, [])

  const updateSelectionsInStore = (questionId, answerId) => {
    const prevSelections = [...store.selections]
    const newSelections = prevSelections.map(selection => {
      
      if (selection.questionId === questionId) {
        return {questionId: selection.questionId, answerId: answerId}
      }
      return selection
    })

    console.log(newSelections)

    store.setSelections(newSelections)
    return newSelections
  }

  const redirectToNextPageIfCurrentPageCompleted = (newSelections) => {
    const selectionsOfRenderedQuestions = newSelections.filter(s => 
      questionsToRender.map(q => q.id).includes(s.questionId)  
    )

    if (allQuestionsAnswered(selectionsOfRenderedQuestions)) {
      const urlToTransistionTo = isFinalPage ? summaryPageHref : nextPageHref
      router.push(urlToTransistionTo, null, {
        shallow: true,
      })
    }
  }

  const onOptionClick = (questionId, answerId) => {
    const newSelections = updateSelectionsInStore(questionId, answerId)
    /*
      after summary has been visited and the user refines/modifies answers,
      auto-redirect would be weird
    */
    if (!store.visitedSummary) {
      redirectToNextPageIfCurrentPageCompleted(newSelections)    
    }
  }

  if (!storeHasQuestions) {
    return <div>Loading questions...</div>
  }

  const answeredQuestionsCount = countOfAnsweredQuestions(store.selections)

  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ProgressBar answered={answeredQuestionsCount} total={store.questions.length} />
      <InnerContentWrapper>
        <Heading>DevOps Assessment Tool</Heading>

        <QuestionGrouper
          questions={questionsToRender}
          onOptionClick={onOptionClick}
        />
        
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
