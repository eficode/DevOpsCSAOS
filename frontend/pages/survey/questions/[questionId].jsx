import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useStore } from '../../../store'

import { ContentWrapper } from '../../../components/shared/ContentWrapper'
import Button from '../../../components/button'
import Option from '../../../components/option'
import { getAll } from '../../../services/questions'
import { sendAnswers } from '../../../services/answers'
import NavigationButtons from '../../../components/navigationButtons'
import ProgressBar from '../../../components/progressBar'

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

  const updateSelections = (pointValue) => {
    const newSelections = [...store.selections]
    // update point value of question being answered
    newSelections[questionId - 1] = pointValue
    // update state
    store.setSelections(newSelections)
  }

  const checkAllQuestionsAnswered = () => {
    let allAnswered = true
    store.selections.forEach(selection => {
      
      if (selection === -1) {
        allAnswered = false
      }
    })

    return allAnswered
  }
  
  const handleSubmit = async () => {
    const allAnswered = checkAllQuestionsAnswered()

    if (!allAnswered) {
      // for ui clarity
      alert('please answer all questions to proceed')
      return
    }
    const answersForBackend = questions.map((question, index) => {
      return {
        questionId: question.id,
        value: store.selections[index]
      }
    })

    const email = store.email === '' ? undefined : store.email

    const { results } = await sendAnswers(email, answersForBackend)
    
    //function does not exist?
    //store.setResultsPerCategory(results)
    router.push(summaryPageHref)
  }

  useEffect(() => {
    store.setQuestions(questions)
  }, [])

  return (
    <>
      <ProgressBar />
      <ContentWrapper>
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
                  store.selections[questionId - 1] === pointsAssociatedWithOption
                }
                onClick={() => updateSelections(pointsAssociatedWithOption)}
              />
            )
          })}
        </OptionsWrapper>
        {!isFinalQuestion ? (
          <NavigationButtons currentQuestionId={questionId} surveyLength={questions.length}/>
        ) : (
          <Button type="submit" onClick={handleSubmit}>Go to answer summary</Button>
        )}
      </ContentWrapper>
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
