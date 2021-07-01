import React from 'react'
import styled from 'styled-components'
import { Button as MUIButton } from '@material-ui/core'

const StyledButton = styled(MUIButton)`
  background-color: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.blueDianne};
  &:hover {
    background-color: ${({ theme }) => theme.colors.amber};
  }
  font-family: Montserrat;
  font-weight: bold;
  font-size: 12px;
  text-decoration: none;
  border-radius: 2px;
  border-width: 0px;
  margin: 1%;
  min-width: 90px;
  line-height: 30px;
  padding: 1%;
  text-transform: capitalize;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 1px 2px;
`

const Button = ({ onClick, children, type }) => (
  <StyledButton onClick={onClick} type={type}>
    {children}
  </StyledButton>
)

export default Button
