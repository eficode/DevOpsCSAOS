import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const NotSelectedOption = styled(Button)`
  background-color: ${({ theme }) => theme.colors.gold};
  border-radius: 3px;
  border-width: 0px;
  font-size: 15px;
  font-family: Montserrat;
  font-weight: bold;
  text-transform: capitalize;

  &:hover {
    background-color: ${({ theme }) => theme.colors.amber};
  }
`

const SelectedOption = styled(Button)`
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.brandyPunch};
  font-size: 15px;
  font-family: Montserrat;
  font-weight: bold;
  border-width: 0px;
  text-transform: capitalize;
`

const Option = ({ label, selected, onClick }) => {
  if (selected) {
    return <SelectedOption onClick={onClick}>{label}</SelectedOption>
  }
  return <NotSelectedOption onClick={onClick}>{label}</NotSelectedOption>
}

export default Option
