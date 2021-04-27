import React from 'react'
import styled from 'styled-components'
import { useStore } from '../store'
import Option from './option'

const QuestionWrapper = styled.div`
  margin: 50px 0;
  display: grid;
  grid-gap: 30px;
  align-items: center;
  grid-template-columns: 240px 240px;
  width:100%;
 
 @media screen and (max-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); 
  }
`

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 40% 40%;
  gap: 30px;
  justify-content: right;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    grid-template-columns: 1fr; 
  } 
`

const QuestionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  font-size: 1rem !important;
  margin: 10px 0 30px 0;
`

const QuestionSeparator = styled.hr`
  background-color: ${({ theme }) => theme.colors.silver};
  width: 45%;
  height: 2px;
  border: none;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 100%;
  }
`

const Wrapper = styled.article`
  display: grid;
  place-items: center;
  width: 100%;
`

const SingleQuestion = ({ question, onOptionClick }) => {
  const store = useStore()
  const currentSelection = store.selections.find(
    (s) => s.questionId === question.id,
  ).answerId

      return (
  <Wrapper>
      <QuestionWrapper>
        <QuestionTitle>{question.text}</QuestionTitle>
        <OptionsWrapper>
          {question.Question_answers.map((answer) => (
            <Option
              key={answer.id}
              id={answer.id}
              selected={answer.id === currentSelection}
              label={answer.text}
              onClick={() => onOptionClick(question.id, answer.id)}
            />
          ))}
        </OptionsWrapper>
      </QuestionWrapper>
      <QuestionSeparator />
    </Wrapper>
  )
}

export default SingleQuestion
