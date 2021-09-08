import React from 'react'
import { Button } from '@material-ui/core'
import {
  useTheme,
  makeStyles,
  responsiveFontSizes,
} from '@material-ui/core/styles'




const useStyles = makeStyles((theme) => ({
  submit: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: '12px',
    borderRadius: '6px',
    borderWidth: '0px',
    textDecoration: 'none',
    textAlign: 'center',
    cursor: 'pointer',
    textTransform: 'capitalize',
    backgroundColor: '#FFD700',
    color: '#1E3944',
    margin: '1%',
    padding: '1%',
    '&:hover':{
      backgroundColor: '#FFC200',
    },
  },
  disabled: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: '12px',
    borderRadius: '6px',
    borderWidth: '0px',
    textDecoration: 'none',
    textAlign: 'center',
    cursor: 'pointer',
    textTransform: 'capitalize',
    backgroundColor: '#8a8a8a42',
    color: '#1E3944',
    margin: '1%',
    padding: '1%',
    '&:hover':{
      backgroundColor: '#8a8a8a42',
    },
  },
}))

const styledButton = ({ onClick, children, type }) => {
  let theme = useTheme()
  theme = responsiveFontSizes(theme)
  const classes = useStyles(theme)
  

  if (type === 'submit') {
    return (
      <Button variant='contained' className={classes.submit} onClick={onClick} type={type}>
      {children}
    </Button>
    )
  }

  if (type === 'disabled') {
    return (
      <Button variant='contained' className={classes.disabled} onClick={onClick} type={type}>
      {children}
    </Button>
    )
  }

  console.warn('Check allowed button types')
  return <Button onClick={onClick} type={type} >{children}</Button>
}

export default styledButton
