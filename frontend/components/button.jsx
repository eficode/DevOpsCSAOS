import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blueDianne};
  color: white;
  font-family: inherit;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  border-width: 0px;
  margin: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.easternBlue};
  }
`

const Button = React.forwardRef(({ children, type, onClick }, ref) => {
  if (type === 'button') {
    return (
      <StyledButton
        type="button"
        onClick={onClick}
        ref={ref}
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
        ref={ref}
      >
        {children}
      </StyledButton>
    )
  }

  console.warn('custom button only has button and submit types')
  return (<></>)
})

export default Button
