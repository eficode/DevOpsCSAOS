import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { useStore } from '../../../store'

const QuestionAnswerWrapper = styled.article`
  margin: 1rem 0;

  span {
    display: inline-block;
    margin: 0.4rem 0;
  }
`

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value)
}

const Summary = () => {
  const selections = useStore((state) => state.selections)
  const optionsToPointsMap = useStore((state) => state.optionsToPointsMap)
  const questions = useStore((state) => state.questions)

  return (
    <div>
      <h2>Here's what you've answered</h2>
      {questions.map((question, index) => {
        let answerToQuestion = getKeyByValue(
          optionsToPointsMap,
          selections[index]
        ).toLowerCase()

        if (answerToQuestion === 'neutral') {
          answerToQuestion = 'feel neutral'
        }

        return (
          <QuestionAnswerWrapper>
            <span>Question: {question.text}</span>
            <br />
            <span>You {answerToQuestion}</span>
          </QuestionAnswerWrapper>
        )
      })}
      <Link href="/survey/result">Go to your results!</Link>
    </div>
  )
}

export default Summary
