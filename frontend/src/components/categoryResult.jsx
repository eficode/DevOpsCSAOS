import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { useTheme, makeStyles } from '@material-ui/core/styles'

export const CategoryTitle = styled.h3`
  font-family: Montserrat;
  color: ${({ theme }) => theme.colors.blueDianne};
`

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: 'Montserrat',
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
  category: {
    fontFamily: 'Montserrat',
  },
  score: {
    fontFamily: 'Montserrat',
  },
  text: {
    fontFamily: 'Montserrat',
  },
}))


const CategoryResult = ({
  userResult,
  maxResult,
  category,
  description,
  resultText,
  links,
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.content}>
        <Typography variant="h5" className={classes.category}>
          {category}
          {'\u00A0'}
        </Typography>
        <Typography variant="h5" className={classes.score}>
          {userResult} / {maxResult}
        </Typography>
        <Typography variant="body1" className={classes.text}>
          <strong>{description}</strong> {resultText}
          { links && 
          " Read more about our solutions and ideas:"
        }
        </Typography>
        {links?.map((link, index) => (
           <Link href={link.url} target="_blank" rel="noopener" underline="none">
           &nbsp; {index + 1}.&nbsp;{link.type}&nbsp;
         </Link>
        ))}
      </Grid>
    </Grid>
  )
}

export default CategoryResult
