import React, { useState } from 'react'
import styled from 'styled-components'
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core'

const StyledFormControl = styled(FormControl)`
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
  font-family: Montserrat;
  border-radius: 10px;
  border-width: 0px;
  padding: 4.5px 5px;
  margin-bottom: 10px;
  min-width: 100%;
`
const StyledSelect = styled(Select)`
  font-family: Montserrat;
  font-size: 11px;
  padding-left: 15px;
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
  color: ${(props) => (props.value === 0 ? '#717171' : '#000000')};
  .MuiSelect-select:focus {
    background-color: ${({ theme }) => theme.colors.whiteSmoke};
  }
`

const StyledMenuItem = styled(MenuItem)`
  font-family: Montserrat;
  font-size: 14px;
`

const IndustrySelector = () => {
  const [industry, setIndustry] = useState(0)
  const handleChange = (event) => {
    setIndustry(event.target.value)
  }

  return (
    <StyledFormControl>
      <StyledSelect
        disableUnderline
        displayEmpty
        value={industry}
        onChange={handleChange}
      >
        <StyledMenuItem value={0} disabled>
          Select industry
        </StyledMenuItem>
        <StyledMenuItem value={1}>Software</StyledMenuItem>
        <StyledMenuItem value={2}>Malware</StyledMenuItem>
        <StyledMenuItem value={3}>Warfare</StyledMenuItem>
        <StyledMenuItem value={4}>Other</StyledMenuItem>
      </StyledSelect>
    </StyledFormControl>
  )
}

export default IndustrySelector
