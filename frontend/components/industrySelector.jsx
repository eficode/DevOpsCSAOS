import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core'
import { getIndustries } from '../services/routes'

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
  color: ${props => props.value === 0 ? "#717171" : "#000000"};
  .MuiSelect-select:focus {
    background-color: ${({ theme }) => theme.colors.whiteSmoke};
  }
`

const StyledMenuItem = styled(MenuItem)`
  font-family: Montserrat;
  font-size: 14px;
`

const IndustrySelector = (selectedIndustry, setSelectedIndustry) => {
  const [industries, setIndustries] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const industriesFromDb = await getIndustries()
        setIndustries(industriesFromDb)
      } catch (err) {
        console.err(err)
      }
    })()
  }, [])

  const handleChange = (event) => {
    setSelectedIndustry(event.target.value)
  }

  if (!industries || industries.length === 0) {
    return <></>
  }

  return (
    <StyledFormControl>
      <StyledSelect
        disableUnderline
        displayEmpty
        value={selectedIndustry}
        onChange={handleChange}
      >
        <StyledMenuItem value={0} disabled>
          Select your industry
        </StyledMenuItem>
        {industries.forEach((industry) => (
          <StyledMenuItem value={industry.id}>{industry.name}</StyledMenuItem>
        ))}
        <StyledMenuItem value={1}>Software</StyledMenuItem>
        <StyledMenuItem value={2}>Malware</StyledMenuItem>
        <StyledMenuItem value={3}>Warfare</StyledMenuItem>
        <StyledMenuItem value={4}>Other</StyledMenuItem>
      </StyledSelect>
    </StyledFormControl>
  )
}

export default IndustrySelector
