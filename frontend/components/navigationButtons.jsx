import React from 'react'
import styled from 'styled-components'
import StyledLink from './link'

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
`

const NavigationButtons = ({ currentQuestionId }) => {
  const prevQUrl = `/survey/questions/question/?id=${currentQuestionId - 1}`

  const isFirstQuestion = currentQuestionId === 1

  return (
    <NavWrapper>
      {!isFirstQuestion && (
        <StyledLink href={prevQUrl} passHref type="secondary">
          Previous
        </StyledLink>
      )}
    </NavWrapper>
  )
}

export default NavigationButtons
