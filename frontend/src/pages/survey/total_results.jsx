/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import Link from '../../components/link'
import CategoryResult from '../../components/categoryResult'
import TotalResultBarChart from '../../components/totalResultBarChart'
import TotalResultRadarChart from '../../components/totalResultRadarChart'
import { useStore } from '../../store'
import { ContentAnimationWrapper } from '../../components/contentAnimationWrapper'
import { getFullResults } from '../../services/routes'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useTheme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '0',
    padding: '3%',
    borderRadius: '12px',
  },
  contentRow: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
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
    paddingBottom: '6px',
  },
  result: {
    fontFamily: 'Montserrat',
    fontWeight: '300',
    paddingBottom: '10px',
  },
  categoryContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

const Home = () => {
  const [renderMobileLayout, setRenderMobileLayout] = useState(false)
  const [renderMobileChart, setRenderMobileChart] = useState(false)
  const [fullResultsLoaded, setFullResultsLoaded] = useState(false)
  const store = useStore()
  const theme = useTheme()
  const classes = useStyles(theme)

  useEffect(() => {

    if (process.env.NODE_ENV === 'test') {
      setFullResultsLoaded(true)
    }
    const url = new URLSearchParams(window.location.search)
    const version = url.get('version')
    if (version) {
      store.setFeatureToggleSwitch(version)
    }

    const handleResize = () => {
      window.innerWidth <= 800
        ? setRenderMobileLayout(true)
        : setRenderMobileLayout(false)
      window.innerWidth <= 1000
        ? setRenderMobileChart(true)
        : setRenderMobileChart(false)
    }

    window.addEventListener('resize', handleResize)
    ;(async () => {
      // eslint-disable-next-line no-undef
      const token = url.get('user')
      try {
        const fullResults = await getFullResults(token)
        setFullResultsLoaded(true)
        store.setDetailedResults(fullResults)
      } catch (e) {
        setFullResultsLoaded(true)
      }
    })()
  }, [])

  if (!fullResultsLoaded) {
    return <div>loading results...</div>
  }

  if (fullResultsLoaded && !store.detailedResults) {
    return (
      <>
        <Head>
          <title>DevOps Capability Survey</title>
        </Head>
        <Grid container direction="row" className={classes.contentRow}>
          <Grid item md={2}>
            <img src="/leftside.png" width="100%" alt="Left banner" />
          </Grid>
          <Grid item container xs={12} md={8} xl={6}>
            <Paper className={classes.paper}>
              <h2>Invalid link</h2>
              <p>We did not find any results for this user :(</p>
              <Link href="/" type="primary">
                Back to home
              </Link>
            </Paper>
          </Grid>
          <Grid item md={2}>
            <img src="/rightside.png" width="100%" alt="Right banner" />
          </Grid>
        </Grid>
      </>
    )
  }

  const { maxPoints, userPoints, text } = store.detailedResults.surveyResult
  const { categoryResults } = store.detailedResults
  const { featureToggleSwitch } = store

  // add % out of maxes to categories for charts
  const percentages = categoryResults.map((category) => ({
    userPerCentOutOfMax: category.userPoints / category.maxPoints,
    groupPerCentOutOfMax: category.groupAverage / category.maxPoints,
    industryPerCentOutOfMax: category.industryAverage / category.maxPoints,
    maxPercentage: 1,
    ...category,
  }))

  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <Grid container direction="row" className={classes.contentRow}>
        <Grid item md={2} className={classes.image}>
          <img src="/leftside.png" width="100%" alt="Left banner" />
        </Grid>
        <Grid item container xs={12} md={8} xl={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.title}>
              Your Results
            </Typography>
            <Typography variant="h5" className={classes.score}>
              {Math.round(userPoints)} / {Math.round(maxPoints)}
            </Typography>
            <Typography variant="h6" className={classes.result}>
              {text}
            </Typography>
            <ContentAnimationWrapper>
              <Grid
                container
                className={classes.categoryContainer}
                data-testid="categorycontainer"
              >
                {categoryResults.map((result, index) => (
                  <CategoryResult
                    key={result.name}
                    renderMobileLayout={renderMobileLayout}
                    userResult={Math.round(result.userPoints)}
                    maxResult={Math.round(result.maxPoints)}
                    category={result.name}
                    description={result.description}
                    resultText={result.text}
                    index={index}
                  />
                ))}
              </Grid>
              {featureToggleSwitch === 'A' ? (
                <TotalResultRadarChart data={percentages} />
              ) : (
                <TotalResultBarChart
                  data={percentages}
                  renderMobileLayout={renderMobileChart}
                />
              )}
            </ContentAnimationWrapper>
          </Paper>
        </Grid>
        <Grid item md={2} className={classes.image}>
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
