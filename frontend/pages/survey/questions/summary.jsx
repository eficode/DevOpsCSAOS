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
      <h2>Here are your current answers</h2>
      {/* we're assuming that questions are always available */}
      {questions.map((question, index) => {
        let answerToQuestion = getKeyByValue(
          optionsToPointsMap,
          selections[index]
        )?.toLowerCase()

        // no selection for given question
        if (!answerToQuestion) {
          answerToQuestion = "haven't answered this question."
        }

        if (answerToQuestion === 'neutral') {
          answerToQuestion = 'feel neutral'
        }

        const QuestionText = `Question: ${question.text}`
        const AnswerText = `You: ${answerToQuestion}`

        return (
          <QuestionAnswerWrapper key={question.id}>
            <Link href={`/survey/questions/${index + 1}/`}>{QuestionText}</Link>
            <br />
            <span>{AnswerText}</span>
          </QuestionAnswerWrapper>
        )
      })}
      <Link href="/survey/result">Go to your results!</Link>
    </div>
  )
}

export default Summary
