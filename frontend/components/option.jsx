import React from 'react'
import styled from 'styled-components'

const NotSelectedOption = styled.button`
  background-color: ${({ theme }) => theme.colors.gold};
  border-radius: 3px;
  border-width: 0px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.amber};
  }
`

const SelectedOption = styled.button`
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.brandyPunch};
`

const Option = ({ label, selected, onClick }) => {
  if (selected) {
    return <SelectedOption onClick={onClick}>{label}</SelectedOption>
  }

  return <NotSelectedOption onClick={onClick}>{label}</NotSelectedOption>
}

export default Option
