import React from 'react'
import styled from 'styled-components'
import Link from 'next/router'

const linkStyle = `
  font-family: inherit;
  font-weight: bold;
  font-size: 15px;
  text-decoration: none;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  border-width: 0px;
  margin: 10px;
`

const StyledPrimaryOrSubmitButton = styled.a`
  background-color: ${({ theme }) => theme.colors.blueDianne};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.easternBlue};
  }

  ${linkStyle}
`

const StyledSecondaryButton = styled.a`
  background-color: ${({ theme }) => theme.colors.cararra};
  color: ${({ theme }) => theme.colors.nevada};

  &:hover {
    background-color: ${({ theme }) => theme.colors.silver};
  }

  ${linkStyle}
`

const StyledLink = ({ children, type, href}) => {
  if (type === 'primary') {
    return (
        <StyledPrimaryOrSubmitButton
        type="button"
        href={href}
      >
        {children}
      </StyledPrimaryOrSubmitButton>
      
    )
  }

  if (type === 'secondary') {
    return (
      <StyledSecondaryButton
        type="button"
        href={href}
      >
        {children}
      </StyledSecondaryButton>
      
    )
  }

  if (type === 'submit') {
    return (
      <StyledPrimaryOrSubmitButton
        type="submit"
        onClick={onClick}
      >
        {children}
      </StyledPrimaryOrSubmitButton>
    )
  }

  console.warn('custom button only has primary, secondary and submit types')
  return (<></>)
}

export default StyledLink
