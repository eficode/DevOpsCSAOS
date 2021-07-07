import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useStore } from '../../store'
import { ContentAnimationWrapper } from '../../components/contentAnimationWrapper'
import ShareResultsGroup from '../../components/shareResultsGroup'
import GetDetailedResultsForm from '../../components/getDetailedResultsForm'
import { getIndustries } from '../../services/routes'
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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    minHeight: '80vh',
    height: '100%',
    margin: '0',
    padding: '3%',
    borderRadius: '12px',
  },
  contentRow:{
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
    fontFamily: 'Merriweather',
    fontWeight: 'bold',
  },
  title: {
    fontFamily: 'Merriweather',
    fontWeight: '700',
    paddingBottom: '15px',
  },
  result: {
    fontFamily: 'Merriweather',
    fontWeight: '300',
  },
  resultText: {
    fontFamily: 'Merriweather',
    textAlign: 'center',
    padding: '15px 0 30px 0',
    lineHeight: '1.6',
    fontSize: '16px',
  },
}))



const Home = () => {
  const store = useStore()
  const theme = useTheme()
  const classes = useStyles(theme)

  let maxPoints, userPoints, text, userBestInCategory, userWorstInCategory
  let categories = []
  let industries = []
  
  useEffect( async () => {
    if(store.industries.length === 0){
        try {
          const response = await getIndustries()
          store.setIndustries(response)
        } catch (error) {
          console.error(error)
        }    
      }
    },[])



  if(store.industries.length !== 0){
    maxPoints = store.results.surveyResult.maxPoints
          userPoints = store.results.surveyResult.userPoints
          text = store.results.surveyResult.text
          categories = store.results.categories
          userBestInCategory = store.results.userBestInCategory
          userWorstInCategory = store.results.userWorstInCategory
          industries = store.industries
  }

  const convertArrayOfCategoriesToString = () => {
    let str = `${categories[0]}`
    categories.slice(1, categories.length - 1).forEach((category) => {
      str += `, ${category}`
    })
    str += ` and ${categories[categories.length - 1]}`

    return str
  }

  const listOfCategories = convertArrayOfCategoriesToString()

  return (!industries ? <div>Loading your results</div> :
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <Typography variant="h5" className={classes.title}>
        DevOps Self Assessment
      </Typography>
      <Typography variant="subtitle1" >
        Assess your DevOps cababilities here, lorem ipsum
      </Typography>
      <Grid container className={classes.contentRow}>
        <Grid item md={2} className={classes.image}>
          <img src="/leftside.png" width="100%" alt="Left banner" />
        </Grid>
        <Grid item xs={12} md={7}>
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
                The tool assesses your DevOps capabilities in different
                categories based on your answers. We have assessed your
                capabilities in categories <strong>{listOfCategories}</strong>.
                Your highest score was in the category
                <strong> {userBestInCategory}</strong>, whereas you scored
                lowest in
                <strong> {userWorstInCategory}</strong>. Fill in the form below
                to get your detailed results by email and see how to improve
                your skills. You can also compare your results with others in
                your industry or in the selected reference group.
              </Typography>
              <ShareResultsGroup
                text={text}
                userPoints={userPoints}
                maxPoints={maxPoints}
              />
              <GetDetailedResultsForm industries={industries} />
            </ContentAnimationWrapper>
          </Paper>
        </Grid>
        <Grid item md={2} className={classes.image}>
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

export default Home
