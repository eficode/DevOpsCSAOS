/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import DoneIcon from '@material-ui/icons/Done'
import {
  useTheme,
  makeStyles,
  responsiveFontSizes,
} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useStore } from '../../../store'
import { ContentAnimationWrapper } from '../../../components/contentAnimationWrapper'
import SingleQuestion from '../../../components/singleQuestion'
import { getAllQuestions } from '../../../services/routes'
import { useRouter, withRouter } from '../../../components/staticRouting'
import StyledLink from '../../../components/link'
import NavigationGroup from '../../../components/navigationGroup'
import { allQuestionsAnswered, countOfAnsweredQuestions } from '../../../utils'
import StyledButton from '../../../components/button'
import { sendAnswers } from '../../../services/routes'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '8px',
    margin: '0px',
    height: '100%',
    borderRadius: '12px',
    backgroundColor: '#F0F0EC',
  },
  rowGrid: {
    minHeight: '540px',
    [theme.breakpoints.down('sm')]: {
      minHeight: '540px',
      minWidth: '0px',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    margin: '4px',
  },
  content: {
    justifyContent: 'center',
  },
  contentRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#1E3944',
    fontFamily: 'Montserrat',
    fontSize: '1.6rem',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: '5%',
  },
  text: {
    color: '#1E3944',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    marginTop: '1vh',
    marginBottom: '5vh',
    [theme.breakpoints.down('sm')]: {
      margin: '1vh',
    },
  },
  indicator: {
    fontFamily: 'Montserrat',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
  warningText: {
    marginBottom: '-5.5%',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    marginTop: '1vh',
    color: '#ff6600',
    [theme.breakpoints.down('sm')]: {
      margin: '1vh',
    },
  },
  allAnsweredText: {
    marginBottom: '-5.5%',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    marginTop: '1vh',
    color: 'green',
    [theme.breakpoints.down('sm')]: {
      margin: '1vh',
    },
  },
}))

const SurveyPage = () => {
  const router = useRouter()
  const store = useStore()
  let theme = useTheme()
  theme = responsiveFontSizes(theme)
  const classes = useStyles(theme)

  const pageId = Number(router.query.id)
  const questionsToRender = store.questionGroups[pageId - 1]

  const nextPageHref = `/survey/questions/?id=${pageId + 1}`
  const previousPageHref = `/survey/questions/?id=${pageId - 1}`
  const frontPageRef = '/'

  const isFinalPage = pageId === store.questionGroups.length
  const isFirstPage = pageId === 1
  const storeHasQuestions = store.questions.length > 0

  const selections = useStore((state) => state.selections)
  const questions = useStore((state) => state.questions)
  const [unansweredAlert, setUnansweredAlert] = useState(false)
  const [allAnsweredAlert, setAllAnsweredAlert] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (store.questions.length === 0) {
        try {
          const surveyId = 1
          const response = await getAllQuestions(surveyId)

          store.setQuestions(response, store.featureToggleSwitch)
        } catch (error) {
          console.error(error)
        }
      }
    })()
  }, [])

  const handleSubmit = async () => {
    if (!allQuestionsAnswered(store.selections)) {
      // eslint-disable-next-line no-undef
      setUnansweredAlert(true)
      setTimeout(() => {
        setUnansweredAlert(false)
      }, 3000)
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

  const updateSelectionsInStore = (questionId, answerId) => {
    const prevSelections = [...store.selections]
    const newSelections = prevSelections.map((selection) => {
      if (selection.questionId === questionId) {
        return { questionId: selection.questionId, answerId }
      }
      return selection
    })

    store.setSelections(newSelections)
    if (allQuestionsAnswered(newSelections)) {
      setUnansweredAlert(false)
      setAllAnsweredAlert(true)
    }
    return newSelections
  }

  const redirectToNextPageIfCurrentPageCompleted = (newSelections) => {
    const selectionsOfRenderedQuestions = newSelections.filter((s) =>
      questionsToRender.map((q) => q.id).includes(s.questionId)
    )

   

    if (allQuestionsAnswered(selectionsOfRenderedQuestions)) {
      isFinalPage
        ? null
        : router.push(nextPageHref, null, {
            shallow: true,
          })
    }
  }

  const onOptionClick = (questionId, answerId) => {
    const newSelections = updateSelectionsInStore(questionId, answerId)
    /*
      after summary has been visited and the user refines/modifies answers,
      auto-redirect would be weird
    */

    
    if (!store.visitedSummary) {
      redirectToNextPageIfCurrentPageCompleted(newSelections)
    }

  }

  if (!storeHasQuestions) {
    return <div>Loading questions...</div>
  }

  const answeredQuestionsCount = countOfAnsweredQuestions(store.selections)

  return (
      <div className={classes.content}>
        <Grid
          container
          direction="column"
          alignContent="center"
          alignItems="center"
        >
          <Grid item>
            <Head>
              <title>DevOps Capability Survey</title>
            </Head>
            <Typography variant="h5" className={classes.heading}>
              DevOps self-assessment
            </Typography>

            {/* <Typography variant="subtitle1" className={classes.text}>
              Answer these {store.questions.length} questions to receive
              feedback on your DevOps capabilities.
            </Typography> */}
          </Grid>
          <Grid container item className={classes.contentRow}>
            <Grid item md={2} className={classes.image}>
              <img src="/leftside.png" width="100%" alt="Left banner" />
            </Grid>
            <Grid item xs={12} md={5}>
              <Box>
                <Paper className={classes.card}>
                  <Grid item>
                    <ContentAnimationWrapper>
                      {questionsToRender &&
                        questionsToRender.map((question) => (
                          <SingleQuestion
                            key={question.id}
                            question={question}
                            onOptionClick={onOptionClick}
                            answered={answeredQuestionsCount}
                            total={store.questions.length}
                          />
                        ))}
                    </ContentAnimationWrapper>
                  </Grid>
                  {unansweredAlert ? (
                    <Typography
                      variant="subtitle2"
                      className={classes.warningText}
                    >
                      Please answer all questions to continue.
                    </Typography>
                  ) : null}
                  {allAnsweredAlert ? (
                    <Typography
                      variant="subtitle2"
                      className={classes.allAnsweredText}
                    >
                      All questions answered, submit to finalize and see your
                      results.
                    </Typography>
                  ) : null}
                  
                    <NavigationGroup>
                      {!isFirstPage ? (
                        <StyledLink
                          href={previousPageHref}
                          passHref
                          type="secondary"
                        >
                          <ChevronLeftIcon /> Previous
                        </StyledLink>
                      ) : (
                        <StyledLink
                          href={frontPageRef}
                          passHref
                          type="secondary"
                        >
                          <ChevronLeftIcon /> To Front Page
                        </StyledLink>
                      )}

                      <Typography variant="h6" className={classes.indicator}>
                        {pageId} / {store.questions.length}
                      </Typography>

                      {!isFinalPage ? (
                        <StyledLink href={nextPageHref} passHref type="primary">
                          Next <ChevronRightIcon />
                        </StyledLink>
                      ) : allQuestionsAnswered(store.selections) ? (
                        <StyledButton type="submit" onClick={handleSubmit}>
                          Submit <DoneIcon />
                        </StyledButton>
                      ) : (
                        <StyledButton type="disabled" onClick={handleSubmit}>
                          Submit <DoneIcon />
                        </StyledButton>
                      )}
                    </NavigationGroup>
                  
                </Paper>
              </Box>
            </Grid>
            <Grid item md={2} className={classes.image}>
              <img src="/rightside.png" width="100%" alt="Right banner" />
            </Grid>
          </Grid>
          <Box textAlign="center" marginTop="20px">
            <img src="/logo.png" alt="Logo" width={120} height={90} />
          </Box>
        </Grid>
      </div>
  )
}

export default withRouter(SurveyPage)
