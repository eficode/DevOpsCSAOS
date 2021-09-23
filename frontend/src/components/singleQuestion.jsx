import React from 'react'
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import Typography from '@material-ui/core/Typography'
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
  radioButtonGroup: {
    width: 'auto',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    padding: '0.15rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'flex',
      marginTop: '10%',
      textAlign: 'center',
      float: 'left',
      alignContent: 'center',
      flexDirection: 'column',
      flexWrap: 'wrap',
      padding: '0.15rem',
    },
  },
  radio: {
    color: '#1E3944',
    '&$checked': {
      color: '#FFD700',
      '&:hover': {
        backgroundColor: '#ffd70040',
      },
    },
    '&:hover': {
      backgroundColor: '#ffd70040',
    },
  },
  checked: {},
  radioTextLabel: {
    color: '#1E3944',
    fontFamily: 'Montserrat',
    fontSize: '0.65rem !important',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem !important',
    },
    padding: '0.15rem !important',
  },
  text: {
    color: '#1E3944',
    fontFamily: 'Open Serif, Roboto, serif',
    lineHeight: '1.2',
    textAlign: 'left',
    padding: '1.2vh',
  },
  singleOption: {
    padding: '0px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '5px',
      paddingBottom: '5px',
    },
  },
  questionContainer: {
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
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

  const screenSizeIsRegular = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <div className={classes.questionContainer}>
      <Typography variant="h6" className={classes.text}>
        {question.text}
      </Typography>
      <RadioGroup
        size="small"
        aria-label="answer options"
        name="answer options"
        defaultValue="top"
        className={classes.radioButtonGroup}
      >
        {question.Question_answers.map((answer) => (
          <FormControlLabel
            className={classes.singleOption}
            key={answer.id}
            value={answer.text}
            control={
              <Radio
                size='medium'
                checked={answer.id === currentSelection}
                classes={{ root: classes.radio, checked: classes.checked }}
                onClick={() => onOptionClick(question.id, answer.id)}
              />
            }
            label={
              <Typography variant="body2" className={classes.radioTextLabel}>
                {answer.text}
              </Typography>
            }
            labelPlacement={screenSizeIsRegular === true ? 'top' : 'end'}
          />
        ))}
      </RadioGroup>
    </div>
  )
}

export default SingleQuestion
