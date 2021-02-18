import Link from '../../../components/link'
import React from 'react'
import styled from 'styled-components'
import { useStore } from '../../../store'
import Head from 'next/head'
import { InnerContentWrapper } from '../../../components/shared/InnerContentWrapper'
import ProgressBar from '../../../components/progressBar'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0 0 0;
  width: 100%;
  position: absolute;
  top: 15px;
  padding-bottom: 30px;
  background-color: white;
  border-radius: 0.5rem;
`

const QuestionAnswerWrapper = styled.article`
  margin: 1rem 0;
  font-family: Montserrat;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.blueDianne};
  span {
    display: inline-block;
    margin: 0.4rem 0;
    font-family:Merriweather;
    font-weight: normal;
    font-size: 16px;
    color black;
  }
`
const Title = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 10px 0 30px 0;
`

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value)
}

const Summary = () => {
  const selections = useStore((state) => state.selections)
  const optionsToPointsMap = useStore((state) => state.optionsToPointsMap)
  const questions = useStore((state) => state.questions)

  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ProgressBar />
      <InnerContentWrapper>
        <Content>
          <Title>Here are your current answers</Title>
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

              const QuestionText = `${question.text}`
              const AnswerText = `You ${answerToQuestion}`

              return (
                <QuestionAnswerWrapper key={question.id}>
                  {QuestionText}
                  <br />
                  <span>{AnswerText}</span>
                </QuestionAnswerWrapper>
                )
              })}
          <Link href="/survey/result" type="primary">Go to your results!</Link>
        </Content>
      </InnerContentWrapper>
    </>
  )}

export default Summary
