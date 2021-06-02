import React from 'react'
import styled from 'styled-components'
import { useStore } from '../store'
import Option from './option'

const QuestionWrapper = styled.div`
  margin: 5px 0;
  display: inline;
  grid-gap: 30px;
  align-items: center;
  grid-template-columns: 240px 240px;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
`

const ProgressIndicator = styled.div`
  float: right;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: x-small  
  }
`

const OptionsWrapper = styled.div`
  display: inline-flex;
  grid-template-columns: 30% 30%;
  gap: 20px;
  justify-content: center;
  align-content: stretch;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  width: 100%;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    gap: 15px;
    flex-direction: column;
    margin-bottom: 7vw;
  }
`

const QuestionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  font-size: 1.2rem !important;
  margin: 6vw 0 8vw 0;
  float: left;
  text-align: left !important;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    margin: 10px 0 30px 0;
  }
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

const SingleQuestion = ({ question, onOptionClick, answered, total }) => {
  const store = useStore()
  const { featureToggleSwitch } = store
  const currentSelection = store.selections.find(
    (s) => s.questionId === question.id
  ).answerId

  return (
    <Wrapper>
      <QuestionWrapper>
        <ProgressIndicator>{question.id} / {total}</ProgressIndicator>
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
      {featureToggleSwitch === 'A' ? (<></>) : ( <QuestionSeparator /> )}
      
    </Wrapper>
  )
}

export default SingleQuestion
