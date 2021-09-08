import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useStore } from '../../store'
import { ContentAnimationWrapper } from '../../components/contentAnimationWrapper'
import ShareResultsGroup from '../../components/shareResultsGroup'
import GetDetailedResultsForm from '../../components/getDetailedResultsForm'
import { getBaseUrl, getIndustries } from '../../services/routes'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useTheme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '0',
    padding: '3%',
    borderRadius: '12px',
    backgroundColor: '#F0F0EC',
  },
  contentRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
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
    fontSize: '0.8rem',
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

  let maxPoints, userPoints, text, userBestInCategory, userWorstInCategory
  let categories = []
  let industries = []

  useEffect(async () => {
    const fetchedUrl = await getBaseUrl()
    setBaseUrl(fetchedUrl)
    if (store.industries.length === 0) {
      try {
        const response = await getIndustries()
        store.setIndustries(response)
      } catch (error) {
        console.error(error)
      }
    }
  }, [])

  if (store.industries.length !== 0) {
    maxPoints = store.results.surveyResult.maxPoints
    userPoints = store.results.surveyResult.userPoints
    text = store.results.surveyResult.text
    categories = store.results.categories
    userBestInCategory = store.results.userBestInCategory
    userWorstInCategory = store.results.userWorstInCategory
    industries = store.industries
  }

  return !industries.length === 0 ? (
    <div>Loading your results</div>
  ) : (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <Typography variant="h5" className={classes.title}>
        DevOps self-assessment
      </Typography>
      <Grid container className={classes.contentRow}>
        <Grid item md={2} xl={1} className={classes.image}>
          <img src="/leftside.png" width="100%" alt="Left banner" />
        </Grid>
        <Grid item xs={12} md={7} xl={5}>
          <Paper className={classes.paper}>
            <ContentAnimationWrapper>
              <Typography variant="h5" className={classes.title}>
                Your Results
              </Typography>
              <Typography variant="h5" className={classes.score}>
                {Math.round(userPoints)} / {Math.round(maxPoints)}
              </Typography>
              <Typography variant="h6" className={classes.result}>
                {text}
              </Typography>
              <Typography
                variant="body1"
                className={classes.resultText}
                data-testid="summarytext"
              >
                We have Assessed your capabilities in the following categories:
              </Typography>
              <ul data-testid="category-list" className={classes.categoryList}>
                {categories.map((category) => (
                  <li key={category}>
                    {category}
                    {category === userBestInCategory ? (
                      <>
                        <span> - </span>{' '}
                        <span className={classes.categoryWithHighScore}>
                          Highest Score
                        </span>
                      </>
                    ) : category === userWorstInCategory ? (
                      <>
                        <span> - </span>
                        <span className={classes.categoryWithLowScore}>
                          Lowest Score
                        </span>
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
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
                You can also compare your results with others in your industry
                or in the selected reference group.
              </Typography>
              {baseUrl === '' ? null : (
                <ShareResultsGroup
                  text={text}
                  userPoints={userPoints}
                  maxPoints={maxPoints}
                  baseUrl={baseUrl}
                />
              )}
              <GetDetailedResultsForm industries={industries} />
            </ContentAnimationWrapper>
          </Paper>
        </Grid>
        <Grid item md={2} xl={1} className={classes.image}>
          <img src="/rightside.png" width="100%" alt="Right banner" />
        </Grid>
      </Grid>
      <Box textAlign="center" marginTop="20px">
        <img src="/logo.png" alt="Logo" width={120} height={90} />
      </Box>
    </>
  )
}

export default Home