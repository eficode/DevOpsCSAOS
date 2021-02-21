import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blueDianne};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.easternBlue};
  }

  font-family: Montserrat;
  font-weight: bold;
  font-size: 14px;
  text-decoration: none;
  border-radius: 5px;
  border-width: 0px;
  margin-top: 40px;
  min-width: 120px;
  line-height: 45px;
  padding-left: 10px;
  padding-right: 10px;

  cursor: pointer;
`

const Button = ({ children, type, onClick }) => {
  if (type === 'button') {
    return (
      <StyledButton onClick={onClick} type="button">
        {children}
      </StyledButton>
    )
  }

  if (type === 'submit') {
    return (
      <StyledButton onClick={onClick} type="submit">
        {children}
      </StyledButton>
    )
  }

  console.warn('custom button only has button and submit types')
  return <></>
}

export default Button
