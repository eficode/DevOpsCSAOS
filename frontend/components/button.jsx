import React from 'react'
import styled from 'styled-components'
import { Button as MUIButton } from '@material-ui/core'

const StyledButton = styled(MUIButton)`
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
  text-transform: capitalize;

  cursor: pointer;
`

const Button = ({ onClick, children, type }) => (
  <StyledButton onClick={onClick} type={type}>
    {children}
  </StyledButton>
)

export default Button
