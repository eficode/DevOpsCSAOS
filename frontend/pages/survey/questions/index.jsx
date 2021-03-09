import React, { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'
import { useStore } from '../../../store'
import chunk from 'lodash/chunk'

import InnerContentWrapper from '../../../components/shared/InnerContentWrapper'
import Option from '../../../components/option'
import QuestionGrouper from '../../../components/questionGrouper'
import NavigationButtons from '../../../components/navigationButtons'
import ProgressBar from '../../../components/progressBar'
import { getAll as getAllQuestions } from '../../../services/questions'
import { useRouter, withRouter } from '../../../components/staticRouting'
import Button from '../../../components/button'

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
  const summaryPageHref = '/survey/questions/summary'

  const isFinalPage = pageId === store.questionGroups.length
  const questionsToRender = store.questionGroups[pageId - 1]
  
  useEffect(() => {
    ;(async () => {
      if (store.questions.length === 0) {
        const response = await getAllQuestions()
        store.setQuestions(response)
      }
    })()
  }, [])

  const onReviewClick = () => {
    router.push(summaryPageHref)
  }

  // this needs to be changed, but is here for placeholder
  if (store.questions.length === 0) {
    return <div>Loading questions...</div>
  }

  console.log(store.selections)
  
  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ProgressBar />
      <InnerContentWrapper>
        <Heading>DevOps Assessment Tool</Heading>

        <QuestionGrouper questions={questionsToRender}> </QuestionGrouper>

        <NavigationButtons
          currentPageId={pageId}
          pageCount={store.questionGroups.length}
        />
        {isFinalPage ? (
          <Button onClick={() => onReviewClick()} type="button">
            Review
          </Button>
        ) : null}
      </InnerContentWrapper>
    </>
  )
}

export default withRouter(SurveyPage)
