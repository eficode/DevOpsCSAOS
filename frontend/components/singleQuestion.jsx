import React from 'react'
import styled from 'styled-components'
import { useStore } from '../store'
import { questions } from '../tests/testutils/utils'
import Option from './option'

const QuestionWrapper = styled.div`
  width: 80%;
  margin: 50px;
  display: grid;
  grid-template-columns: 50% 50%;
  justify-items: center;
  align-items: center;
`

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 45% 45%;
  grid-template-rows: 60px 60px 60px;
  column-gap: 10%;
  row-gap: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
  width: 80%;

  button {
    cursor: pointer;
  }
`

const QuestionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 10px 0 30px 0;
`

const QuestionSeparator = styled.div`
  background-color: ${({ theme }) => theme.colors.silver};
  width: 60%;
  height: 2px;
`

const SingleQuestion = ({ question }) => {
  const store = useStore()
  const optionsToPointsMap = useStore((state) => state.optionsToPointsMap)
  const currentSelection = store.selections.find(s => s.questionId === question.id).value

  const updateSelections = (pointValue) => {
    const prevSelections = [...store.selections]
    const newSelections = prevSelections.map(selection => {
      if (selection.questionId === question.id) {
        return {questionId: selection.questionId, value: pointValue}
      }
      return selection
    })
    store.setSelections(newSelections)
  }

  return (
    <>
      <QuestionWrapper>
        <QuestionTitle>{question.text}</QuestionTitle>
        <OptionsWrapper>
          {Object.keys(optionsToPointsMap).map((optionLabel) => {
            const pointsAssociatedWithOption = optionsToPointsMap[optionLabel]

            return (
              <Option
                key={pointsAssociatedWithOption}
                label={optionLabel}
                selected={
                  currentSelection === pointsAssociatedWithOption
                }
                onClick={() => updateSelections(pointsAssociatedWithOption)}
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
