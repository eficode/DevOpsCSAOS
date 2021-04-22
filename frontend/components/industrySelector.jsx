import React, { useState, useEffect } from 'react'
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
  color: ${props => props.value === 0 ? "#717171" : "#000000"};
  .MuiSelect-select:focus {
    background-color: ${({ theme }) => theme.colors.whiteSmoke};
  }
`

const StyledMenuItem = styled(MenuItem)`
  font-family: Montserrat;
  font-size: 14px;
`

const IndustrySelector = ({ industries, selectedIndustry, setSelectedIndustry }) => {

  const handleChange = (event) => {
    event.preventDefault()
  }


  /*
  <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
  */
console.log(industries)
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
        {industries && industries.map(i => {
          return (
            <StyledMenuItem key={i.id}>
              {i.name}
            </StyledMenuItem>
          )
        })}
      </StyledSelect>
    </StyledFormControl>
  )
}

export default IndustrySelector
