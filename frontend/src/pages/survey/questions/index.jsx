/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect } from 'react'
import Head from 'next/head'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import LastPageIcon from '@material-ui/icons/LastPage'
import DoneIcon from '@material-ui/icons/Done'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useStore } from '../../../store'
import { ContentAnimationWrapper } from '../../../components/contentAnimationWrapper'
import QuestionGrouper from '../../../components/questionGrouper'
import { getAllQuestions } from '../../../services/routes'
import { useRouter, withRouter } from '../../../components/staticRouting'
import StyledLink from '../../../components/link'
import NavigationGroup from '../../../components/navigationGroup'
import { allQuestionsAnswered, countOfAnsweredQuestions } from '../../../utils'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '8px',
    margin: '0px',
    height: '100%',
    borderRadius: '12px',
  },
  rowGrid: {
    minHeight: '400px',
    [theme.breakpoints.down('sm')]: {
      minHeight: '510px',
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
    fontFamily: 'Montserrat',
    fontSize: '28px',
    textAlign: 'center',
    fontWeight: '600',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    marginTop: '1vh',
    marginBottom: '5vh',
    [theme.breakpoints.down('sm')]: {
      margin: '1vh',
    },
  }
}))

const SurveyPage = () => {
  const router = useRouter()
  const store = useStore()
  const theme = useTheme()
  const classes = useStyles(theme)

  const pageId = Number(router.query.id)
  const questionsToRender = store.questionGroups[pageId - 1]

  const nextPageHref = `/survey/questions/?id=${pageId + 1}`
  const previousPageHref = `/survey/questions/?id=${pageId - 1}`
  const summaryPageHref = '/survey/questions/summary'

  const isFinalPage = pageId === store.questionGroups.length
  const isFirstPage = pageId === 1
  const storeHasQuestions = store.questions.length > 0
  const { visitedSummary } = store

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

  const updateSelectionsInStore = (questionId, answerId) => {
    const prevSelections = [...store.selections]
    const newSelections = prevSelections.map((selection) => {
      if (selection.questionId === questionId) {
        return { questionId: selection.questionId, answerId }
      }
      return selection
    })

    store.setSelections(newSelections)
    return newSelections
  }

  const redirectToNextPageIfCurrentPageCompleted = (newSelections) => {
    const selectionsOfRenderedQuestions = newSelections.filter((s) =>
      questionsToRender.map((q) => q.id).includes(s.questionId)
    )

    if (allQuestionsAnswered(selectionsOfRenderedQuestions)) {
      const urlToTransistionTo = isFinalPage ? summaryPageHref : nextPageHref
      router.push(urlToTransistionTo, null, {
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
    <>
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

            <Typography variant="subtitle1" className={classes.text}>
              Answer these {store.questions.length} questions to receive
              feedback on your DevOps capabilities.
            </Typography>
          </Grid>
          <Grid container item className={classes.contentRow}>
            <Grid item md={2} className={classes.image}>
              <img src="/leftside.png" width="100%" alt="Left banner" />
            </Grid>
            <Grid item xs={12} md={5}>
              <Box>
                <Paper className={classes.card}>
                  <Grid container item spacing={4} className={classes.rowGrid}>
                    <Grid item>
                      <ContentAnimationWrapper>
                        <QuestionGrouper
                          answered={answeredQuestionsCount}
                          total={store.questions.length}
                          questions={questionsToRender}
                          onOptionClick={onOptionClick}
                        />
                      </ContentAnimationWrapper>
                    </Grid>
                    <Grid item container direction="row" align="flex-end">
                      <NavigationGroup>
                        {!isFirstPage ? (
                          <StyledLink
                            href={previousPageHref}
                            passHref
                            type="secondary"
                          >
                            <ChevronLeftIcon /> Previous{'\u00A0'}
                          </StyledLink>
                        ) : (
                          <div />
                        )}

                        {visitedSummary && !isFinalPage ? (
                          <StyledLink
                            href={summaryPageHref}
                            passHref
                            type="tertiary"
                          >
                            {'\u00A0'}To summary <LastPageIcon fontSize="small" />
                          </StyledLink>
                        ) : (
                          <></>
                        )}
                        {!isFinalPage ? (
                          <StyledLink
                            href={nextPageHref}
                            passHref
                            type="primary"
                          >
                            {'\u00A0'}Next <ChevronRightIcon />
                          </StyledLink>
                        ) : (
                          <StyledLink
                            href={summaryPageHref}
                            passHref
                            type="primary"
                          >
                            Review <DoneIcon fontSize="small" />
                          </StyledLink>
                        )}
                      </NavigationGroup>
                    </Grid>
                  </Grid>
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
    </>
  )
}

export default withRouter(SurveyPage)
