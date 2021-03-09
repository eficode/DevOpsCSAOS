import React, { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'
import { useStore } from '../../../store'

import InnerContentWrapper from '../../../components/shared/InnerContentWrapper'
import Option from '../../../components/option'
import QuestionGrouper from '../../../components/questionGrouper'
import NavigationButtons from '../../../components/navigationButtons'
import ProgressBar from '../../../components/progressBar'
import { getAll as getAllQuestions } from '../../../services/questions'
import { useRouter, withRouter } from '../../../components/staticRouting'

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

const Question = () => {
  const router = useRouter()
  const store = useStore()

  const { questions } = store
  const questionNumber = 1
  const questionsWithNumber = questions.map((question) => ({
    ...question,
    number: questionNumber,
  }))
  const optionsToPointsMap = useStore((state) => state.optionsToPointsMap)

  const questionId = Number(router.query.id)
  const summaryPageHref = '/survey/questions/summary'
  const isFinalQuestion = questionId === questions.length

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
  // this needs to be changed, but is here for placeholder
  if (store.questions.length === 0) {
    return <div>Loading questions...</div>
  }

  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ProgressBar id={questionId} total={questions.length} />
      <InnerContentWrapper>
        <Heading>DevOps Assessment Tool</Heading>

        <QuestionGrouper questions={questions}> </QuestionGrouper>

        <NavigationButtons
          currentQuestionId={questionId}
          surveyLength={questions.length}
        />
        {isFinalQuestion ? (
          <Link href={summaryPageHref} type="primary">
            Review
          </Link>
        ) : null}
      </InnerContentWrapper>
    </>
  )
}

export default withRouter(Question)
