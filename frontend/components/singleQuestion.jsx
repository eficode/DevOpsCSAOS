import React from 'react'
import styled from 'styled-components'
import { useStore } from '../store'
import Option from './option'

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

  button {
    cursor: pointer;
  }
`

const QuestionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 10px 0 30px 0;
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
    </>
  )
}

export default SingleQuestion
