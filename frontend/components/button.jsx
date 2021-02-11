import React from 'react'
import styled from 'styled-components'

const buttonStyle = `
  font-family: inherit;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  border-width: 0px;
  margin: 10px;
`

const StyledPrimaryOrSubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blueDianne};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.easternBlue};
  }

  ${buttonStyle}
`

const StyledSecondaryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.cararra};
  color: ${({ theme }) => theme.colors.nevada};

  &:hover {
    background-color: ${({ theme }) => theme.colors.silver};
  }

  ${buttonStyle}
`

const Button = ({ children, type, onClick }) => {
  if (type === 'primary') {
    return (
      <StyledPrimaryOrSubmitButton
        type="button"
        onClick={onClick}
      >
        {children}
      </StyledPrimaryOrSubmitButton>
    )
  }

  if (type === 'secondary') {
    return (
      <StyledSecondaryButton
        type="button"
        onClick={onClick}
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

export default Button
