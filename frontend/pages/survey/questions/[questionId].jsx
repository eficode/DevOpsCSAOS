import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import ContentWrapper from '../../../components/contentWrapper'
import Button from '../../../components/button'
import Option from '../../../components/option'
import getAll from '../../../services/questions'

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

export async function getServerSideProps() {
  // fetch all pre-defined questions
  const questions = await getAll()
  return {
    props: { questions }, // will be passed to the page component as props
  }
}

const Question = ({ questions }) => {
  const [selectedValue, setSelectedValue] = useState(0)
  const router = useRouter()

  const questionId = Number(router.query.questionId)
  const nextQuestionUrl = `/survey/questions/${questionId + 1}`
  const isLast = questionId === questions.length

  const Buttons = isLast ? (
    <Button type="submit" onClick={() => console.log('saving!')}>
      Get results!
    </Button>
  ) : (
    <Button type="button" onClick={() => router.push(nextQuestionUrl)}>
      Next
    </Button>
  )

  return (
    <ContentWrapper>
      <Heading>DevOps Assessment Tool</Heading>
      <span>
        {' '}
        Question {questionId}/{questions.length}{' '}
      </span>
      <QuestionTitle>{questions[questionId - 1].text}</QuestionTitle>
      <OptionsWrapper>
        <Option
          label="Strongly agree"
          selected={selectedValue === 5}
          onClick={() => setSelectedValue(5)}
        />
        <Option
          label="Agree"
          selected={selectedValue === 4}
          onClick={() => setSelectedValue(4)}
        />
        <Option
          label="Neutral"
          selected={selectedValue === 3}
          onClick={() => setSelectedValue(3)}
        />
        <Option
          label="Disagree"
          selected={selectedValue === 2}
          onClick={() => setSelectedValue(2)}
        />
        <Option
          label="Strongly disagree"
          selected={selectedValue === 1}
          onClick={() => setSelectedValue(1)}
        />
      </OptionsWrapper>
      {Buttons}
    </ContentWrapper>
  )
}

export default Question
