import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStore } from '../../../store'
import Head from 'next/head'

import InnerContentWrapper from '../../../components/shared/InnerContentWrapper'
import ProgressBar from '../../../components/progressBar'
import Button from '../../../components/button'
import { sendAnswers } from '../../../services/answers'
import { allQuestionsAnswered, countOfAnsweredQuestions } from '../../../utils'
import StyledLink from '../../../components/link'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
    font-family: Merriweather;
    font-weight: normal;
    font-size: 16px;
    color: black;
  }
`
const Title = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 10px 0 30px 0;
`

const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value)

const Summary = () => {
  const selections = useStore((state) => state.selections)
  const optionsToPointsMap = useStore((state) => state.optionsToPointsMap)
  const questions = useStore((state) => state.questions)

  const store = useStore()
  const router = useRouter()
  const total = questions.length

  const lastQuestionHref = `/survey/questions/?id=${store.questionGroups.length}`

  useEffect(() => {
    store.setVisitedSummary(true)
  }, [])

  const handleSubmit = async () => {
    if (!allQuestionsAnswered(store.selections)) {
      alert('Please answer all of the questions to proceed')
      return
    }

    const surveyId = 1

    const email = store.email === '' ? undefined : store.email
    const answersForBackend = store.selections.map(selection => selection.answerId)
    
    const { results } = await sendAnswers(email, answersForBackend, surveyId)
    console.log(results)
    store.setResultsPerCategory(results.categoryResults)

    store.setUserResult(results.surveyResult.userPoints)


    store.setMaxResult(results.surveyResult.maxPoints)


    store.setResultText(results.surveyResult.text)

    router.push('/survey/result')
  }

  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ProgressBar answered={countOfAnsweredQuestions} total={total} />
      <InnerContentWrapper>
        <Content>
          <Title>Here are your current answers</Title>
          {questions &&
            questions.map((question) => {
            let answerText
            let currentAnswerId = selections.find((s) => s.questionId === question.id).answerId
            
            if (!currentAnswerId) {
              answerText = "You haven't answered this question."
            } else {
              const selectedAnswerText = question.Question_answers.find((a) => a.id === currentAnswerId).text
              answerText = `You answered: ${selectedAnswerText}` 
            }

            const QuestionText = `${question.text}`
            
            return (
              <QuestionAnswerWrapper key={question.id}>
                {QuestionText}
                <br />
                <span>{answerText}</span>
              </QuestionAnswerWrapper>
            )
          })}
          <StyledLink type='secondary' href={lastQuestionHref}>
            Back to survey
          </StyledLink>
          <Button type="submit" onClick={handleSubmit}>
            Submit answers
          </Button>
        </Content>
      </InnerContentWrapper>
    </>
  )
}

export default Summary
