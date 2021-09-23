/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { useState } from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import IndustrySelector from './industrySelector'
import { useStore } from '../store'


const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: '#ff6600',
    [theme.breakpoints.down('sm')]: {
      margin: '1vh',
    },
  },
  formBackground: {
    width: '100%',
    padding: '10px',
    background: '#f0f0ec',
    borderRadius: '15px',
    fontFamily: 'Montserrat'
  },
  selectionForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px 0 10px 0',
    justifyContent: 'flex-start',
    padding: '0 14%',
  },
}))


const StartingPageForm = ({ industries }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [selectedIndustry, setSelectedIndustry] = useState(0)

  return (
    <div className={classes.formBackground}>
      <div id="industry-selection-field"  className={classes.selectionForm}>
          <IndustrySelector
            industries={industries}
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
          />
      </div>
    </div>
  )
}

export default StartingPageForm
