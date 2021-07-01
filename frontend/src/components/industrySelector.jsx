import React from 'react'
import styled from 'styled-components'
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core'


const StyledFormControl = styled(FormControl)`
  background-color: white;
  font-family: Montserrat;
  border-radius: 10px;
  border-width: 0px;
  padding: 4.5px 5px;
  margin-bottom: 10px;
  min-width: 100%;
`
const StyledSelect = styled(Select)`
  font-family: Montserrat;
  font-size: 14px;
  padding-left: 15px;
  background-color: white;
  color: ${(props) => (props.value === 0 ? '#717171' : '#000000')};
  .MuiSelect-select:focus {
    background-color: white;
  }
`

const StyledMenuItem = styled(MenuItem)`
  font-family: Montserrat;
  font-size: 14px;
`

const IndustrySelector = ({ industries, selectedIndustry, setSelectedIndustry }) => {

  const handleChange = (event) => {
    event.preventDefault()
    setSelectedIndustry(event.target.value)
  }

  return (
    <StyledFormControl>
      <StyledSelect
        disableUnderline
        displayEmpty
        value={selectedIndustry}
        onChange={handleChange}
      >
        <StyledMenuItem key={0} value={0}>
          Select your industry
        </StyledMenuItem>
        {industries && industries.map(i => (
          <StyledMenuItem key={i.id} value={i.id} name={i.name}>
            {i.name}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  )
}

export default IndustrySelector
