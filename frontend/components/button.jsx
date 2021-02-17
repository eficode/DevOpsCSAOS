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
  width: 120px;
  height: 45px;

  cursor: pointer;
`

const Button = ({ children, type, onClick, id }) => {
  if (type === 'button') {
    return (
      <StyledButton id={id} onClick={onClick} type="button">
        {children}
      </StyledButton>
    )
  }

  if (type === 'submit') {
    return (
      <StyledButton id={id} onClick={onClick} type="submit">
        {children}
      </StyledButton>
    )
  }

  console.warn('custom button only has button and submit types')
  return <></>
}

export default Button
