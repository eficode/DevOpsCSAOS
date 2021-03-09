import React from 'react'
import styled from 'styled-components'
import StyledLink from './link'

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
`

const NavigationButtons = ({ currentPageId, pageCount }) => {
  const prevPageUrl = `/survey/questions/?id=${currentPageId - 1}`
  const nextPageUrl = `/survey/questions/?id=${currentPageId + 1}`

  const isFirstPage = currentPageId === 1
  const isLastPage = currentPageId === pageCount

  return (
    <NavWrapper>
      {!isFirstPage && (
        <StyledLink href={prevPageUrl} passHref type="secondary">
          Back
        </StyledLink>
      )}
      {!isLastPage && (
        <StyledLink href={nextPageUrl} passHref type="primary">
          Next
        </StyledLink>
      )}
    </NavWrapper>
  )
}

export default NavigationButtons
