/* eslint-disable no-alert */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useStore } from '../../../store'
import { ContentAnimationWrapper } from '../../../components/contentAnimationWrapper'
import { InnerContentWrapper } from '../../../components/shared/InnerContentWrapper'
import { ProgressBar } from '../../../components/progressBar'
import StyledButton from '../../../components/button'
import { sendAnswers } from '../../../services/routes'
import { allQuestionsAnswered, countOfAnsweredQuestions } from '../../../utils'
import StyledLink from '../../../components/link'
import Heading from '../../../components/heading'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
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
  a {
    text-decoration: none;
    color: black;
  }
  a:visited {
    color: black;
  }
`

const Summary = () => {
  const selections = useStore((state) => state.selections)
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
      // eslint-disable-next-line no-undef
      alert('Please answer all of the questions to proceed')
      return
    }

    const surveyId = 1

    const groupId = store.groupId === '' ? undefined : store.groupId
    const answersForBackend = store.selections.map(
      (selection) => selection.answerId
    )

    try {
      const response = await sendAnswers(answersForBackend, surveyId, groupId)
      store.setResults(response.results)
      store.setUserToken(response.token)
      router.push('/survey/result')
    } catch (e) {
      // eslint-disable-next-line no-undef
      alert(`Something went wrong while submitting answers: ${e.message}`)
    }
  }

  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ProgressBar
        answered={countOfAnsweredQuestions(store.selections)}
        total={total}
      />
      <InnerContentWrapper>
        <Content>
          <ContentAnimationWrapper>
            <Heading component="h1" variant="h6">
              Here are your current answers
            </Heading>
            {questions &&
              questions.map((question) => {
                let answerText
                const currentAnswerId = selections.find(
                  (s) => s.questionId === question.id
                ).answerId

                if (!currentAnswerId) {
                  answerText = "You haven't answered this question."
                } else {
                  const selectedAnswerText = question.Question_answers.find(
                    (a) => a.id === currentAnswerId
                  ).text
                  answerText = `You answered: ${selectedAnswerText}`
                }

                const QuestionText = `${question.text}`

                return (
                  <QuestionAnswerWrapper key={question.id}>
                    <a href={`http://${window.location.host}`+'/survey/questions/?id='+question.id}
                    >{QuestionText}</a>
                    <br />
                    <span>{answerText}</span>
                  </QuestionAnswerWrapper>
                )
              })}
          </ContentAnimationWrapper>
          <StyledLink type="secondary" href={lastQuestionHref}>
            Back to survey
          </StyledLink>
          <StyledButton type="submit" onClick={handleSubmit}>
            Submit answers
          </StyledButton>
        </Content>
      </InnerContentWrapper>
    </>
  )
}

export default Summary
