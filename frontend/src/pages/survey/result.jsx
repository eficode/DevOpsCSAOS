import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useStore } from '../../store'
import TotalResultRadarChart from '../../components/totalResultRadarChart'
import ShareResultsGroup from '../../components/shareResultsGroup'
import GetDetailedResultsForm from '../../components/getDetailedResultsForm'
import TotalResult from '../../components/totalResult'
import {
  getBaseUrl,
  getIndustries,
  getFullResults,
  getRolesAndChallenges,
} from '../../services/routes'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import { sortedIndex } from 'lodash'

const useStyles = makeStyles((theme) => ({
  paper: {
    color: '#1E3944',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
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
  },
  title: {
    color: '#1E3944',
    fontFamily: 'Montserrat',
    fontWeight: '700',
    paddingBottom: '15px',
  },
  result: {
    fontFamily: 'Montserrat',
    fontWeight: '300',
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
}))

const Home = () => {
  const store = useStore()
  const theme = useTheme()
  const classes = useStyles(theme)
  const [baseUrl, setBaseUrl] = useState('')
  const [rolesAndChallenges, setRolesAndChallenges] = useState([])
  const [fullResultsLoaded, setFullResultsLoaded] = useState(false)

  let maxPoints,
    userPoints,
    text,
    userBestInCategory,
    userWorstInCategory,
    categoryResults,
    roles,
    challenges
  let industries = []

  useEffect(async () => {
    const fetchedUrl = await getBaseUrl()
    setBaseUrl(fetchedUrl)
    setRolesAndChallenges(await getRolesAndChallenges())
    
    if (store.industries.length === 0 || !fullResultsLoaded) {
      try {
        const fullResults = await getFullResults(store.userToken)
        store.setDetailedResults(fullResults)
        const response = await getIndustries()
        store.setIndustries(response)
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
    industries = store.industries
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

  return !fullResultsLoaded ? (
    <div>Loading your results</div>
  ) : (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <Typography variant="h5" className={classes.title}>
        Your assessment results
      </Typography>
      <Grid container className={classes.contentRow}>
        <Paper className={classes.paper}>
          {' '}
          <Grid item xs={12} md={6} xl={5}>
            {/* <Typography variant="h5" className={classes.title}>
              Your Results
            </Typography> */}
            {/* <TotalResult userResult={userPoints} maxResult={maxPoints}/> */}
            
            <Typography variant="h6" className={classes.result}>
              {text}
            </Typography>
            <Typography variant="h5" className={classes.result}>
             You got {Math.round(userPoints)} out of {Math.round(maxPoints)} total points.
            </Typography>
            <Typography
              variant="body1"
              className={classes.resultText}
              data-testid="summarytext"
            >
              We have Assessed your capabilities in the following categories:
            </Typography>
            <ul data-testid="category-list" className={classes.categoryList}>
              {categoryResults.map((category) => (
                <li key={category.name}>
                  {category.name} -{' '}
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
          <Grid item xs={12} md={5} xl={5}>
            <Typography
              variant="body1"
              className={classes.resultText}
              data-testid="summarytext"
            >
              <strong> Want more detailed results? </strong> <br />
              <br />
              Fill in the form below to get more detailed results by email
              including suggestions on how to improve your skills.
              <br />
              <br />
              You can also compare your results with others in your industry or
              in the selected reference group.
            </Typography>
            {baseUrl === '' ? null : (
              <ShareResultsGroup
                text={text}
                userPoints={userPoints}
                maxPoints={maxPoints}
                baseUrl={baseUrl}
              />
            )}
            <GetDetailedResultsForm
              industries={industries}
              roles={roles}
              challenges={challenges}
            />
          </Grid>
        </Paper>
      </Grid>
      <Box textAlign="center" marginTop="20px">
        <img src="/logo.png" alt="Logo" width={120} height={90} />
      </Box>
    </>
  )
}

export default Home
