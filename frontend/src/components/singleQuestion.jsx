import React from 'react'
import { makeStyles ,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Typography from '@material-ui/core/Typography'
import Option from './option'
import { useStore } from '../store'

const useStyles = makeStyles((theme) => ({
  options: {
    padding: theme.spacing(1),
    textAlign: 'center',
    justifyItems: 'center',
    color: theme.palette.text.secondary,
    fontFamily: 'Montserrat',
    marginTop: '5%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0%',
    },
  },
  heading: {
    paddingTop: '2%',
    height: '90px',
    fontFamily: 'Montserrat',
  },
  text: {
    fontFamily: 'Montserrat',
    lineHeight: '1.2',
  },
  indicator: {
    fontFamily: 'Montserrat',
    textAlign: 'right',
  },
}))

const SingleQuestion = ({ question, onOptionClick, total }) => {
  const store = useStore()
  let theme = createMuiTheme()
  theme = responsiveFontSizes(theme)
  const classes = useStyles(theme)

  const currentSelection = store.selections.find(
    (s) => s.questionId === question.id
  ).answerId

  return (
    <div>
      <Grid container spacing={2} className={classes.heading}>
        <Grid item xs={10}>
          <Typography variant="h6" className={classes.text}>{question.text} </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" className={classes.indicator}>
            {question.id}/{total}
          </Typography>
        </Grid>
      </Grid>
      <br />
      <Grid
        container
        className={classes.options}
        justify="space-evenly"
        spacing={2}
      >
        {question.Question_answers.map((answer) => (
          <Grid item xs={12} sm={4} key={answer.id}>
            <Option
              id={answer.id}
              selected={answer.id === currentSelection}
              label={answer.text}
              onClick={() => onOptionClick(question.id, answer.id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default SingleQuestion
