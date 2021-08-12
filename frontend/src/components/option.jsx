import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

const StyledOption = styled(Button)`
  background-color: 'white';
  border-style: solid;
  size: small;
  border-radius: 8px;
  border-width: ${({ selected }) =>
  selected ? '1.75px': '1.5px'};
  border-color: ${({ theme, selected }) =>
  selected ? theme.colors.gold : theme.colors.whiteSmoke};
  font-size: 0.7rem;
  font-family: Montserrat;
  width: 90%;
  font-weight: bold;
  padding: 4px 6px;
  text-transform: capitalize;
  white-space: nowrap;
  &:hover {
    background-color: ${({ theme, selected }) =>
      selected ? 'white' : theme.colors.whiteSmoke};
  }
`

const Option = ({ id, label, selected, onClick }) => (
  <StyledOption id={id} onClick={onClick} selected={selected}>
    {label}
  </StyledOption>
)

export default Option