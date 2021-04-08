import React, { useState } from 'react'
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core'

const IndustrySelector = () => {
  const [industry, setIndustry] = useState('')

  const handleChange = (event) => {
    setIndustry(event.target.value)
  }

  return (
    <FormControl>
      <InputLabel >
        Field?
      </InputLabel>
      <Select
        value={industry}
        onChange={handleChange}
      >
        <MenuItem value={1}>Software</MenuItem>
        <MenuItem value={2}>Malware</MenuItem>
        <MenuItem value={3}>Warfare</MenuItem>
        <MenuItem value={4}>Other</MenuItem>
      </Select>
    </FormControl>
    )
}
    
export default IndustrySelector