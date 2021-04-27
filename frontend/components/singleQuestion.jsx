import React from 'react'
import styled from 'styled-components'
import { useStore } from '../store'
import Option from './option'

const QuestionWrapper = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: 240px 240px;
  margin: 50px 0;
  place-items: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.wideMobile}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); 
    width: 80%;
  } 
`

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 45% 45%;
  gap: 30px;
  justify-content: right;
  width: 100%;
  min-width: 240px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints2[0]}) {
    grid-template-columns: 1fr; 
  } 
`

const QuestionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 10px 0 30px 0;
`

const QuestionSeparator = styled.hr`
  background-color: ${({ theme }) => theme.colors.silver};
  width: 45%;
  height: 2px;
  border: none;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints2[1]}) {
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
