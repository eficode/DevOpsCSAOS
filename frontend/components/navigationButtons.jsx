import React from 'react'
import styled from 'styled-components'
import StyledLink from './link'

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
`

const NavigationButtons = ({ currentQuestionId, surveyLength }) => {
  const prevQUrl = `/survey/questions/${currentQuestionId - 1}`
  const nextQUrl = `/survey/questions/${currentQuestionId + 1}`

  const isFirstQuestion = currentQuestionId === 1
  const isLastQuestion = currentQuestionId === surveyLength

  return (
    <NavWrapper>
      {!isFirstQuestion
        && (
        <StyledLink id="back" href={prevQUrl} passHref type="secondary">
          Back
        </StyledLink>
        )}
      {!isLastQuestion
        && (
        <StyledLink id="next" href={nextQUrl} passHref type="primary">
          Next
        </StyledLink>
        )}
    </NavWrapper>
  )
}

export default NavigationButtons
