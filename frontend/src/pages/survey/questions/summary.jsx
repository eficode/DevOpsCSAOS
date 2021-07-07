/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useEffect } from 'react'
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
import StyledButton from '../../../components/button'
import { sendAnswers } from '../../../services/routes'
import { allQuestionsAnswered } from '../../../utils'
import StyledLink from '../../../components/link'
import Heading from '../../../components/heading'

const QuestionAnswerWrapper = styled.article`
  margin: 1rem 0;
  font-family: Montserrat;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.blueDianne};
  span {
    display: inline-block;
    margin: 0.4rem 0;
    font-family: Merriweather;
    font-weight: normal;
    font-size: 16px;
    color: black;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.blueDianne};
  }
  a:visited {
    color: ${({ theme }) => theme.colors.blueDianne};
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
    paddingTop: '2%',
    height: '90px',
  },
}))

const Summary = () => {
  const selections = useStore((state) => state.selections)
  const questions = useStore((state) => state.questions)
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
      alert('Please answer all of the questions to proceed')
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
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>

      <Grid container item direction="row" alignItems="center">
        <Grid item md className={classes.image}>
          <img src="/leftside.png" width="100%" alt="Left banner" />
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper className={classes.paper}>
            <ContentAnimationWrapper>
              <Heading component="h1" variant="h6">
                Here are your current answers
              </Heading>
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
                    answerText = "You haven't answered this question."
                  } else {
                    const selectedAnswerText = question.Question_answers.find(
                      (a) => a.id === currentAnswerId
                    ).text
                    answerText = `You answered: ${selectedAnswerText}`
                  }

                  const QuestionText = `${question.text}`

                  return (
                    <QuestionAnswerWrapper key={question.id}>
                      <Link href={`/survey/questions/?id=${question.id}`}>
                        {QuestionText}
                      </Link>
                      <br />
                      <span
                        style={!answeredQuestion ? { color: '#ff6600' } : {}}
                      >
                        {answerText}
                      </span>
                    </QuestionAnswerWrapper>
                  )
                })}
            </ContentAnimationWrapper>
            <StyledLink type="secondary" href={lastQuestionHref}>
              Back to survey
            </StyledLink>
            <StyledButton type="submit" onClick={handleSubmit}>
              Submit answers
            </StyledButton>
          </Paper>
        </Grid>
        <Grid item md className={classes.image}>
          <img src="/rightside.png" width="100%" alt="Right banner" />
        </Grid>
      </Grid>
      <br />
      <Box textAlign="center">
        <Grid item>
          <img src="/logo.png" alt="Logo" width={100} height={100} />
        </Grid>
      </Box>
    </>
  )
}

export default Summary
