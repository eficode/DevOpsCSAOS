import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useStore } from '../../../store'

import Link from 'next/link'
import Button from '../../../components/button'
import Option from '../../../components/option'
import { getAll } from '../../../services/questions'

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 60px 60px;
  column-gap: 10px;
  row-gap: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne};
`

const QuestionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
`

const Question = ({ questions }) => {
  const router = useRouter()
  const store = useStore()

  const optionsToPointsMap = useStore((state) => state.optionsToPointsMap)

  const questionId = Number(router.query.questionId)
  const nextQuestionHref = `/survey/questions/${questionId + 1}`
  const summaryPageHref = '/survey/questions/summary'
  const isFinalQuestion = questionId === questions.length

  const updateSelections = (pointValue) => {
    const newSelections = [...store.selections]
    // update point value of question being answered
    newSelections[questionId - 1] = pointValue
    // update state
    store.setSelections(newSelections)
  }

  useEffect(() => {
    store.setQuestions(questions)
  }, [])

  return (
    <>
      <Heading>DevOps Assessment Tool</Heading>
      <span>
        {' '}
        Question {questionId}/{questions.length}{' '}
      </span>
      <QuestionTitle>{questions[questionId - 1].text}</QuestionTitle>
      <OptionsWrapper>
        {Object.keys(optionsToPointsMap).map((optionLabel) => {
          const pointsAssociatedWithOption = optionsToPointsMap[optionLabel]
          return (
            <Option
              label={optionLabel}
              selected={
                store.selections[questionId - 1] === pointsAssociatedWithOption
              }
              onClick={() => updateSelections(pointsAssociatedWithOption)}
            />
          )
        })}
      </OptionsWrapper>
      {!isFinalQuestion ? (
        <Link href={nextQuestionHref} passHref>
          <Button type="button">Next Question</Button>
        </Link>
      ) : (
        <Link href={summaryPageHref} passHref>
          <Button type="submit">Go to answer summary</Button>
        </Link>
      )}
    </>
  )
}

export async function getStaticProps() {
  // fetch all pre-defined questions
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
