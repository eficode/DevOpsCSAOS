import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
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
        console.log(err)
      }
    })()
  }, [])

  const handleChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
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
        <StyledMenuItem value={1} >
          JEEEE
        </StyledMenuItem>
        {industries&&industries.map(i => {
          return (
            <StyledMenuItem value={i.id} >
              {i.name}
            </StyledMenuItem>
          )
        })}
      </StyledSelect>
    </StyledFormControl>
  )
}

export default IndustrySelector
