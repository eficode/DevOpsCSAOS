import React from 'react'
import styled from 'styled-components'
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
    paddingLeft: '15px',
    backgroundColor: 'white',
  },
  item: {
    fontFamily: 'Montserrat',
    fontSize: '0.75rem',
  },
}))


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
  font-size: 0.65rem;
  padding-left: 15px;
  background-color: white;
  color: ${(props) => (props.value === 0 ? '#717171' : '#000000')};
  .MuiSelect-select:focus {
    background-color: white;
  }
`

const StyledMenuItem = styled(MenuItem)`
  font-family: Montserrat;
  font-size: 0.65rem;
`

const RoleSelector = ({ roles, selectedRole, setSelectedRole, displayAlert  }) => {
  const store = useStore()
  const theme = useTheme()
  const classes = useStyles(theme)

  const handleChange = (event) => {
    event.preventDefault()
    displayAlert()
    setSelectedRole(event.target.value)
    event.target.value === 0
      ? store.setUserSelectedRole('')
      : store.setUserSelectedRole(event.target.value)
  }

  return (
    <StyledFormControl>
      <StyledSelect
        disableUnderline
        displayEmpty
        value={selectedRole}
        onChange={handleChange}
      >
        <StyledMenuItem key={0} value={0}>
          Select your role
        </StyledMenuItem>
        {roles && roles.map(i => (
          <StyledMenuItem key={i} value={i} name={i}>
            {i}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  )
}

export default RoleSelector
