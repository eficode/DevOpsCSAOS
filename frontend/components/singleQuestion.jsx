import React from 'react'
import styled from 'styled-components'
import { useStore } from '../store'
import Option from './option'

const QuestionWrapper = styled.div`
  margin: 50px 0;
  display: grid;
  
  @media screen and (min-width: 800px) {
    grid-template-columns: 240px 240px;
    column-gap: 30px;
  }

  @media screen and (max-width: 800px) {
    grid-template-rows: 30% 70%;
    width: 80%;
  }
`

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 45% 45%;
  grid-template-rows: 60px 60px 60px;
  column-gap: 10%;
  row-gap: 30px;
  justify-content: right;
  width: 100%;
  min-width: 240px;

  button {
    cursor: pointer;
  }
`

const TitleWrapper = styled.div`
  display: grid;
  height: 100%;
  align-content: center;
  min-width: 240px;

  @media screen and (min-width: 1400px) {
    justify-content: left;
  }
`

const QuestionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 10px 0 30px 0;
`

const QuestionSeparator = styled.div`
  background-color: ${({ theme }) => theme.colors.silver};
  width: 45%;
  height: 2px;

  @media screen and (max-width: 800px) {
    margin-top: 40px;
  }
`

const SingleQuestion = ({ question, onOptionClick }) => {
  const store = useStore()
  const optionsToPointsMap = useStore((state) => state.optionsToPointsMap)
  const currentSelection = store.selections.find(s => s.questionId === question.id).answerId  

  
  return (
    <>
      <QuestionWrapper>
        <TitleWrapper>
          <QuestionTitle>{question.text}</QuestionTitle>
        </TitleWrapper>
        <OptionsWrapper>
        {question.Question_answers.map((answer) => {
            
            return (
              <Option
                key={answer.id}
                selected={answer.id === currentSelection}
                label={answer.text}
                onClick={() => onOptionClick(question.id, answer.id)}
              />
            )
          })}
          
        </OptionsWrapper>
      </QuestionWrapper>
      <QuestionSeparator />
    </>
  )
}

export default SingleQuestion
