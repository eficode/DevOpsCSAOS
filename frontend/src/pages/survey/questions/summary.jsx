/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { useStore } from '../../../store'
import { ContentAnimationWrapper } from '../../../components/contentAnimationWrapper'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import StyledButton from '../../../components/button'
import { sendAnswers } from '../../../services/routes'
import { allQuestionsAnswered } from '../../../utils'
import StyledLink from '../../../components/link'

const QuestionAnswerWrapper = styled.article`
  margin: 1rem 0;
  font-family: Montserrat;
  font-weight: normal;
  text-align: left;
  color: ${({ theme }) => theme.colors.blueDianne};
  span {
    display: flex;
    margin: 0.4rem 0;
    font-family: Montserrat;
    font-weight: bold;
    text-align: center !important;
    font-size: 0.9rem;
    color: black;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.blueDianne};
    font-size: 0.9rem;
  }
  a:visited {
    color: ${({ theme }) => theme.colors.blueDianne};
    font-size: 0.9rem;
  }
`

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    minHeight: '80vh',
    height: '100%',
    margin: '0',
    padding: '10%',
    borderRadius: '12px',
    backgroundColor: '#F0F0EC',
  },
  span: {
    display: 'inline-block',
    margin: '0.4rem 0',
    fontFamily: 'Merriweather',
    fontWeight: 'normal',
    fontSize: '16px',
    color: 'black',
  },
  image: {
    paddingBottom: '30%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  heading: {
    fontFamily: 'Montserrat',
    fontSize: '1.1rem',
    textAlign: 'center',
    fontWeight: '600',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  answer: {
    fontSize: '0.8rem !important',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    marginTop: '1vh',
    fontWeight: 'bold',
    color: '#ff6600',
    [theme.breakpoints.down('sm')]: {
      margin: '1vh',
    },
  },
}))

const Summary = () => {
  const selections = useStore((state) => state.selections)
  const questions = useStore((state) => state.questions)
  const [displayAlert, setDisplayAlert] = useState(false)
  const store = useStore()
  const router = useRouter()
  const theme = useTheme()
  const classes = useStyles(theme)
  const lastQuestionHref = `/survey/questions/?id=${store.questionGroups.length}`

  useEffect(() => {
    store.setVisitedSummary(true)
  }, [])

  const handleSubmit = async () => {
    if (!allQuestionsAnswered(store.selections)) {
      // eslint-disable-next-line no-undef
      setDisplayAlert(true)
      return
    }
    const surveyId = 1

    const groupId = store.groupId === '' ? undefined : store.groupId
    const answersForBackend = store.selections.map(
      (selection) => selection.answerId
    )

    const userQuestionAnswerPairs = selections.map((selection, index) => ({
      question: questions[index].text,
      answer: questions[index].Question_answers.find(
        (answer) => answer.id === selection.answerId
      ).text,
    }))
    store.setUserQuestionAnswerPairs(userQuestionAnswerPairs)

    try {
      const response = await sendAnswers(
        answersForBackend,
        surveyId,
        groupId,
        selections
      )
      store.setResults(response.results)
      store.setUserToken(response.token)
      router.push('/survey/result')
      
    } catch (e) {
      // eslint-disable-next-line no-undef
      alert(`Something went wrong while submitting answers: ${e.message}`)
    }
  }

  return (
    <>
      <div>
        <Head>
          <title>Self-assessment tool</title>
        </Head>

        <Grid container direction="row" className={classes.content}>
          <Grid item md xl={1} className={classes.image}>
            <img src="/leftside.png" width="100%" alt="Left banner" />
          </Grid>

          <Grid item xs={12} md={7} xl={5}>
            <Paper className={classes.paper}>
              <ContentAnimationWrapper>
                <Typography variant="h6" className={classes.heading}>
                  Here are your current answers
                </Typography>
                <br />
                {questions &&
                  questions.map((question) => {
                    let answerText
                    let answeredQuestion = true
                    const currentAnswerId = selections.find(
                      (s) => s.questionId === question.id
                    ).answerId

                    if (!currentAnswerId) {
                      answeredQuestion = false
                      answerText = "Click the question to answer."
                    } else {
                      const selectedAnswerText = question.Question_answers.find(
                        (a) => a.id === currentAnswerId
                      ).text
                      answerText = `You answered: ${selectedAnswerText}`
                    }

                    const QuestionText = `${question.id}. ${question.text}`

                    return (
                      <QuestionAnswerWrapper key={question.id}>
                        <Link href={`/survey/questions/?id=${question.id}`}>
                          {QuestionText}
                        </Link>
                        <br />
                        <span className={classes.answer}
                          style={
                            !answeredQuestion
                              ? { color: '#ff6600'}
                              : {}
                          }
                        >
                          {answerText}
                        </span>

                      </QuestionAnswerWrapper>
                    )
                  })}
              </ContentAnimationWrapper>
              <StyledLink type="tertiary" href={lastQuestionHref}>
                Back to survey
              </StyledLink>
              <StyledButton type="submit" onClick={handleSubmit}>
                Submit answers
              </StyledButton>
              {displayAlert ? <Typography variant="subtitle1" className={classes.text}>
              Please answer all questions to continue.
            </Typography> : null}
            </Paper>
          </Grid>
          <Grid item md xl={1} className={classes.image}>
            <img src="/rightside.png" width="100%" alt="Right banner" />
          </Grid>
        </Grid>
        <Box textAlign="center" marginTop="20px">
          <img src="/logo.png" alt="Logo" width={120} height={90} />
        </Box>
      </div>
    </>
  )
}

export default Summary
