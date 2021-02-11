import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blueDianne};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.easternBlue};
  }

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

const Button = ({ children, type, onClick}) => {
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
  return (<></>)
}

export default Button
