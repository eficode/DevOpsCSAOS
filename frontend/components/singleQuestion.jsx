import React from 'react'
import styled from 'styled-components'
import { useStore } from '../store'
import Option from './option'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  options: {
    padding: theme.spacing(1),
    textAlign: 'center',
    justifyItems: 'center',
    color: theme.palette.text.secondary,
    fontFamily: 'Montserrat',
    marginTop: '5%',
  },
  heading: {
    paddingTop: '2%',
  },
}))

let theme = createMuiTheme()
theme = responsiveFontSizes(theme)

const SingleQuestion = ({ question, onOptionClick, answered, total }) => {
  const store = useStore()
  const { featureToggleSwitch } = store
  const classes = useStyles()

  const currentSelection = store.selections.find(
    (s) => s.questionId === question.id
  ).answerId

  return (
    <div>
      <Grid container spacing={2} className={classes.heading}>
        <Grid item xs={10}>
          <Typography variant="h6">{question.text}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">
            {question.id}/{total}
          </Typography>
        </Grid>
      </Grid>
    <br />
      <Grid
        container
        className={classes.options}
        flexShrink={1}
        justify="space-evenly"
        spacing={2}
      >
        {question.Question_answers.map((answer) => (
          <Grid item xs={12} sm >
            <Option
              key={answer.id}
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
