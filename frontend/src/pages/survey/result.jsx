import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useStore } from '../../store'
import TotalResultRadarChart from '../../components/totalResultRadarChart'
import ShareResultsGroup from '../../components/shareResultsGroup'
import GetDetailedResultsForm from '../../components/getDetailedResultsForm'
import TotalResult from '../../components/totalResult'
import {
  getBaseUrl,
  getFullResults,
  getRolesAndChallenges,
} from '../../services/routes'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Lightbox } from "react-modal-image"
import StyledButton from '../../components/button'

import { useTheme, makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  paper: {
    color: '#1E3944',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-around',
    width: '100%',
    margin: '0',
    padding: '3%',
    borderRadius: '12px',
    backgroundColor: '#F0F0EC',
    [theme.breakpoints.down('sm')]: {
      padding: '1.5%',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  contentRow: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  heading: {
    color: '#1E3944',
    paddingTop: '2%',
    height: '90px',
  },
  image: {
    paddingBottom: '20%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  score: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    margin: '1%'
  },
  title: {
    color: '#1E3944',
    fontFamily: 'Montserrat',
    fontWeight: '700',
    paddingBottom: '15px',
  },
  result: {
    fontFamily: 'Montserrat',
    margin: '1%',
  },
  resultText: {
    fontFamily: 'Montserrat',
    textAlign: 'left !important',
    padding: '15px 0 30px 0',
    lineHeight: '1.5 !important',
    fontSize: '0.9rem !important',
  },
  categoryList: {
    fontFamily: 'Montserrat',
    textAlign: 'left',
    marginLeft: '10%',
    marginTop: '2%',
    marginBottom: '2%',
    fontSize: '0.7rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
      marginLeft: '6%',
    },
  },
  categoryWithLowScore: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '0.7rem',
  },
  categoryWithHighScore: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: '0.7rem',
  },
  logoBox: {
    textAlign: 'center',
    marginTop: '4vh',
    [theme.breakpoints.down('sm')]: {
      marginTop: '1vh',
    },
  },
  submitAndShare: {
    placeSelf: 'start',
  },
  submitTextTitle:{
    textAlign: 'center',
    marginBotom: '-1rem',
    fontSize: '1.2rem',
    fontFamily: 'Montserrat'
  },
  placeholderDiv: {
    paddingTop: '30%'
  },
}))

const Home = () => {
  const store = useStore()
  const theme = useTheme()
  const classes = useStyles(theme)
  const [baseUrl, setBaseUrl] = useState('')
  const [rolesAndChallenges, setRolesAndChallenges] = useState([])
  const [fullResultsLoaded, setFullResultsLoaded] = useState(false)
  const [showSubmitSellText, setShowSubmitSellText] = useState(true)
  const [showSampleReport, setShowSampleReport] = useState(false)

  let maxPoints,
    userPoints,
    text,
    userBestInCategory,
    userWorstInCategory,
    categoryResults,
    roles,
    challenges

  useEffect(async () => {
    const fetchedUrl = await getBaseUrl()
    setBaseUrl(fetchedUrl)
    setRolesAndChallenges(await getRolesAndChallenges())

    if (!fullResultsLoaded) {
      try {
        const fullResults = await getFullResults(store.userToken)
        store.setDetailedResults(fullResults)
        setFullResultsLoaded(true)
      } catch (error) {
        console.error(error)
      }
    }
  }, [])

  if (store.industries.length !== 0 && fullResultsLoaded) {
    maxPoints = store.detailedResults.surveyResult.maxPoints
    userPoints = store.detailedResults.surveyResult.userPoints
    text = store.detailedResults.surveyResult.text
    userBestInCategory = store.detailedResults.surveyResult.userBestInCategory
    userWorstInCategory = store.detailedResults.surveyResult.userWorstInCategory
    roles = rolesAndChallenges.roles
    challenges = rolesAndChallenges.challenges
    categoryResults = store.detailedResults.categoryResults
  }

  let percentages = []
  if (fullResultsLoaded) {
    percentages = categoryResults.map((category) => ({
      userPerCentOutOfMax: category.userPoints / category.maxPoints,
      groupPerCentOutOfMax: category.groupAverage / category.maxPoints,
      industryPerCentOutOfMax: category.industryAverage / category.maxPoints,
      maxPercentage: 1,
      ...category,
    }))
  }

  const showReport = () => {
    setShowSampleReport(true)
  }

  const hideReport = () => {
    setShowSampleReport(false)
  }

  return !fullResultsLoaded ? (
    <div>Loading your results</div>
  ) : (
    <>
      <Head>
        <title>Self-assessment tool</title>
      </Head>
      <Typography variant="h5" className={classes.title}>
        Your assessment results
      </Typography>
      <Grid container className={classes.contentRow}>
        <Paper className={classes.paper}>
          {' '}
          <Grid item xs={12} md={6} xl={5}>
            <Typography variant="h6" className={classes.result}>
              {text}
            </Typography>
            <Typography variant="h6" className={classes.score}>
              Total score <br /> {Math.round(userPoints)} / {Math.round(maxPoints)} points</Typography>
            <Typography
              variant="body1"
              className={classes.resultText}
              data-testid="summarytext"
            >
              The assessment and score consist of these categories:
            </Typography>
            <ul data-testid="category-list" className={classes.categoryList}>
              {categoryResults.map((category) => (
                <li key={category.name}>
                  {category.name}   {' '}
                  {category.userPoints + ' / ' + category.maxPoints} points
                  {category.name === userBestInCategory ? (
                    <>
                      <span className={classes.categoryWithHighScore}>
                        {' '}
                        Highest Score
                      </span>
                    </>
                  ) : category.name === userWorstInCategory ? (
                    <>
                      <span className={classes.categoryWithLowScore}>
                        {' '}
                        Lowest Score
                      </span>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
            <TotalResultRadarChart data={percentages} />
          </Grid>
          <Grid item xs={12} md={6} xl={5} className={classes.submitAndShare}>
            {showSubmitSellText ? (
              <>
                  <Typography
                  variant="body1"
                  className={classes.submitTextTitle}
                  data-testid="submitTextTitle"
                >
                <strong> Want more detailed results? </strong> <br />
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.resultText}
                  data-testid="summarytext"
                >
                Fill in the form below to get more detailed results by email
                including suggestions on how to improve your skills.
                <br />
                <br />
                You can also compare your results with others in your industry
                or in the selected reference group.
                {classes.lightbox_container}
              </Typography></>
            ) : <div className={classes.placeholderDiv}></div>}
            <StyledButton type="submit" onClick={() => showReport()}>Show sample report</StyledButton>
                { showSampleReport && (
                        <Lightbox
                          large={'/sample_report.png'}
                          alt="Sample report"
                          onClose={() => hideReport()}
                        />
                    )
                  }
                <br />
                <br />
            {baseUrl === '' ? null : (
              <ShareResultsGroup
                text={text}
                userPoints={userPoints}
                maxPoints={maxPoints}
                baseUrl={baseUrl}
              />
            )}

            <GetDetailedResultsForm
              roles={roles}
              challenges={challenges}
              setShowSubmitSellText={setShowSubmitSellText}
            />
          </Grid>
        </Paper>
      </Grid>
      <Box className={classes.logoBox}>
        <img src="/logo.png" alt="Logo" width={120} height={90} />
      </Box>
    </>
  )
}

export default Home
