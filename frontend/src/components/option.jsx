import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const StyledOption = styled(Button)`
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.brandyPunch : theme.colors.gold};
  border-radius: 3px;
  border-width: 0px;
  font-size: 15px;
  font-family: Montserrat;
  font-weight: bold;
  padding: 10px 15px;
  text-transform: capitalize;
  &:hover {
    background-color: ${({ theme, selected }) =>
      selected ? theme.colors.brandyPunch : theme.colors.amber};
  }
`

const Option = ({ id, label, selected, onClick }) => (
  <StyledOption id={id} onClick={onClick} selected={selected}>
    {label}
  </StyledOption>
)

export default Option
