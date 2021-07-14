import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useTheme, makeStyles } from '@material-ui/core/styles'

export const CategoryTitle = styled.h3`
  font-family: Montserrat;
  color: ${({ theme }) => theme.colors.blueDianne};
`

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: 'Merriweather',
    lineHeight: '2',
    padding: '3%',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  content: {
    fontFamily: 'Montserrat',
    width: '100%',
    height: '100%',
  },
}))

const CategoryResult = ({
  userResult,
  maxResult,
  category,
  description,
  resultText,
  index,
  renderMobileLayout,
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.content}>
        <Typography variant="h5">
          {category}
          {'\u00A0'}
        </Typography>
        <Typography variant="h5">
          {userResult} / {maxResult}
        </Typography>
        <Typography variant="body1">
          <strong>{description}</strong> {resultText}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default CategoryResult
