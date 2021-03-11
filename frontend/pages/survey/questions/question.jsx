import React, { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useStore } from '../../../store'

import InnerContentWrapper from '../../../components/shared/InnerContentWrapper'
import Option from '../../../components/option'
import NavigationButtons from '../../../components/navigationButtons'
import ProgressBar from '../../../components/progressBar'
import { getAll as getAllQuestions } from '../../../services/questions'
import { useRouter, withRouter } from '../../../components/staticRouting'
import Button from '../../../components/button'
import Link from 'next/link'

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

const QuestionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 10px 0 30px 0;
`
const QuestionNumber = styled.span`
  color: ${({ theme }) => theme.colors.nevada};
  font-family: Merriweather;
  font-size: 15px;
`

const Question = () => {
  const router = useRouter()
  const store = useStore()

  const questions = store.questions

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
        <QuestionNumber>
          {' '}
          Question {questionId}/{questions.length}{' '}
        </QuestionNumber>
        <QuestionTitle>{questions[questionId - 1].text}</QuestionTitle>
        <OptionsWrapper>
          {Object.keys(optionsToPointsMap).map((optionLabel) => {
            const pointsAssociatedWithOption = optionsToPointsMap[optionLabel]

            return (
              <Option
                key={pointsAssociatedWithOption}
                label={optionLabel}
                selected={
                  store.selections[questionId - 1] ===
                  pointsAssociatedWithOption
                }
                onClick={() => updateSelections(pointsAssociatedWithOption)}
              />
            )
          })}
        </OptionsWrapper>
        <NavigationButtons
          currentQuestionId={questionId}
          surveyLength={questions.length}
        />
        {isFinalQuestion ? <Link href={summaryPageHref}>Review</Link> : null}
      </InnerContentWrapper>
    </>
  )
}

export default withRouter(Question)
