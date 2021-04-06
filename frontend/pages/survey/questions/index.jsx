import React, { useEffect } from 'react'
import Head from 'next/head'
import { useStore } from '../../../store'
import ContentAnimationWrapper from '../../../components/contentAnimationWrapper'
import InnerContentWrapper from '../../../components/shared/InnerContentWrapper'
import QuestionGrouper from '../../../components/questionGrouper'
import ProgressBar from '../../../components/progressBar'
import { getAll as getAllQuestions } from '../../../services/questions'
import { useRouter, withRouter } from '../../../components/staticRouting'
import StyledLink from '../../../components/link'
import NavigationGroup from '../../../components/navigationGroup'
import { allQuestionsAnswered, countOfAnsweredQuestions } from '../../../utils'
import Heading from '../../../components/heading'

const SurveyPage = () => {
  const router = useRouter()
  const store = useStore()

  const pageId = Number(router.query.id)
  const questionsToRender = store.questionGroups[pageId - 1]

  const nextPageHref = `/survey/questions/?id=${pageId + 1}`
  const previousPageHref = `/survey/questions/?id=${pageId - 1}`
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

          store.setQuestions(response, store.featureToggleSwitch)
        } catch (error) {
          console.error(error)
        }
      }
    })()
  }, [])

  const updateSelectionsInStore = (questionId, answerId) => {
    const prevSelections = [...store.selections]
    const newSelections = prevSelections.map((selection) => {
      if (selection.questionId === questionId) {
        return { questionId: selection.questionId, answerId: answerId }
      }
      return selection
    })

    store.setSelections(newSelections)
    return newSelections
  }

  const redirectToNextPageIfCurrentPageCompleted = (newSelections) => {
    const selectionsOfRenderedQuestions = newSelections.filter((s) =>
      questionsToRender.map((q) => q.id).includes(s.questionId)
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
      <ProgressBar
        answered={answeredQuestionsCount}
        total={store.questions.length}
      />
      <InnerContentWrapper>
        <Heading component="h1" variant="h6">
          DevOps Assessment Tool
        </Heading>
        <ContentAnimationWrapper>
          <QuestionGrouper
            questions={questionsToRender}
            onOptionClick={onOptionClick}
          />
        </ContentAnimationWrapper>

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
          ) : (
            <StyledLink href={summaryPageHref} passHref type="primary">
              Review
            </StyledLink>
          )}
        </NavigationGroup>
      </InnerContentWrapper>
    </>
  )
}

export default withRouter(SurveyPage)
