import React, { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStore } from '../../../store'

import InnerContentWrapper from '../../../components/shared/InnerContentWrapper'
import Link from '../../../components/link'
import Option from '../../../components/option'
import NavigationButtons from '../../../components/navigationButtons'
import ProgressBar from '../../../components/progressBar'
import { getAll } from '../../../services/questions'

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

const Question = ({ questions }) => {
  const router = useRouter()
  const store = useStore()

  const optionsToPointsMap = useStore((state) => state.optionsToPointsMap)

  const questionId = Number(router.query.questionId)
  const summaryPageHref = '/survey/questions/summary'
  const isFinalQuestion = questionId === questions.length

  useEffect(() => {
    store.setQuestions(questions)
  }, questions)

  const updateSelections = (pointValue) => {
    const newSelections = [...store.selections]
    newSelections[questionId - 1] = pointValue
    store.setSelections(newSelections)
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
        {isFinalQuestion ? (
          <Link href={summaryPageHref} type="primary">Review</Link>
        ) : null}
      </InnerContentWrapper>
    </>
  )
}

export async function getStaticProps() {
  const questions = await getAll()
  return {
    props: { questions },
  }
}

export async function getStaticPaths() {
  const questions = await getAll()
  const ids = questions.map((_, index) => index + 1)
  const paths = ids.map((id) => ({
    params: {
      questionId: String(id),
    },
  }))
  return {
    paths,
    fallback: false,
  }
}
export default Question
