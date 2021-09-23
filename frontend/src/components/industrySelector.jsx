import React from 'react'
import { MenuItem, FormControl, Select } from '@material-ui/core'
import { useStore } from '../store'
import { useTheme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  form: {
    backgroundColor: 'white',
    fontFamily: 'Montserrat',
    borderRadius: '10px',
    borderWidth: '0px',
    padding: '4.5px 5px',
    marginBottom: '10px',
    minWidth: '100%',
  },
  selection: {
    fontFamily: 'Montserrat',
    fontSize: '0.75rem',
    backgroundColor: 'white',
  },
  item: {
    fontFamily: 'Montserrat',
    fontSize: '0.75rem',
    justifyContent: 'center',
  },
}))

const IndustrySelector = ({
  industries,
  selectedIndustry,
  setSelectedIndustry,
}) => {
  const store = useStore()
  const theme = useTheme()
  const classes = useStyles(theme)
  const handleChange = (event) => {
    event.preventDefault()
    setSelectedIndustry(event.target.value)
    event.target.value === 0
      ? store.setUserSelectedIndustry('')
      : store.setUserSelectedIndustry(event.target.value)
  }

  return (
    <FormControl className={classes.form}>
      <Select
        disableUnderline
        displayEmpty
        value={selectedIndustry}
        onChange={handleChange}
        className={classes.selection}
      >
        <MenuItem key={0} value={0} className={classes.item}>
          Select your industry
        </MenuItem>
        {industries &&
          industries.map((i) => (
            <MenuItem
              key={i.id}
              value={i.id}
              name={i.name}
              className={classes.item}
            >
              {i.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default IndustrySelector
