/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect } from 'react'
import Head from 'next/head'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import LastPageIcon from '@material-ui/icons/LastPage'
import DoneIcon from '@material-ui/icons/Done'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'
import { useStore } from '../../../store'
import { ContentAnimationWrapper } from '../../../components/contentAnimationWrapper'
import QuestionGrouper from '../../../components/questionGrouper'
import { getAllQuestions } from '../../../services/routes'
import { useRouter, withRouter } from '../../../components/staticRouting'
import StyledLink from '../../../components/link'
import NavigationGroup from '../../../components/navigationGroup'
import { allQuestionsAnswered, countOfAnsweredQuestions } from '../../../utils'
import Heading from '../../../components/heading'


const useStyles = makeStyles(theme => ({
  
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
      <Grid container direction="column" alignContent="center" alignItems="center">
        <Grid item>
          <Head>
            <title>DevOps Capability Survey</title>
          </Head>
          <Heading component="h1" variant="h5">
            DevOps Self Assessment
          </Heading>
          <p> Assess your DevOps cababilities here, lorem ipsum</p>
        </Grid>
        <Grid container item direction="row" alignItems="center">
          <Hidden smDown>
            <Grid item md>
            <img
                src='/leftside.png'
                width='100%'
                alt="Left banner"
              />
            </Grid>
          </Hidden>
          <Grid item xs={12} md={5}>
            <Box>
              <Card variant="elevation" className={classes.card}>
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
                          <ChevronLeftIcon /> Previous
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
                          To summary <LastPageIcon fontSize="small" />
                        </StyledLink>
                      ) : (
                        <></>
                      )}
                      {!isFinalPage ? (
                        <StyledLink href={nextPageHref} passHref type="primary">
                          Next <ChevronRightIcon />
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
              </Card>
            </Box>
          </Grid>
          <Hidden smDown>
            <Grid item md>
               <img
                src='/rightside.png'
                width='100%'
                alt='Right banner'
              />
            </Grid>
          </Hidden>
        </Grid>
        <br />
        <Box textAlign='center'>
          <Grid item>
            {/* <Image src="/logo.png" alt="logo image" width={100} height={100} /> */}
            <img
                src='/logo.png'
                alt='Logo'
                width={100}
                height={100}
              />
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

export default withRouter(SurveyPage)
