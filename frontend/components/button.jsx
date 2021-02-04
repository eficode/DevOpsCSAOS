import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.easternBlue};
  color: white;
  font-family: inherit;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  margin: 10px;

  ${({ type }) => type === 'submit' && `
    background-color: gray;
  `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueDianne};
    ${({ type }) => type === 'button' && `
    background-color: gray;
    `}
  }
`

const Button = ({ children, type, onClick }) => {
  if (type === 'button') {
    return (
      <StyledButton
        type="button"
        onClick={onClick}
      >
        {children}
      </StyledButton>
    )
  }

  if (type === 'submit') {
    return (
      <StyledButton
        type="submit"
        onClick={onClick}
      >
        {children}
      </StyledButton>
    )
  }

  console.warn('custom button only has button and submit types')
  return (<></>)
}

export default Button
