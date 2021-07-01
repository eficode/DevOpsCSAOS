import React, { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useStore } from '../../store'
import { ContentAnimationWrapper } from '../../components/contentAnimationWrapper'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Heading from '../../components/heading'
import ShareResultsGroup from '../../components/shareResultsGroup'
import GetDetailedResultsForm from '../../components/getDetailedResultsForm'
import { getIndustries } from '../../services/routes'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  padding-left: 9%;
  padding-right: 9%;
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    padding-left: 8%;
    padding-right: 8%;
  }
`

const ResultSummaryText = styled.section`
  text-align: center;
  padding: 15px 0 30px 0;
  line-height: 1.6;
  font-size: 16px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    text-align: left;
  }
`

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100% !important',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
    },
    minHeight: '80vh',
    height: '100%',
    margin: '0',
    padding: '3%',
    borderRadius: '12px',
  },
  heading: {
    paddingTop: '2%',
    height: '90px',
  },
  image: {
    paddingBottom: '20%',
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
  }
}))

const Home = () => {
  const store = useStore()
  const theme = useTheme()
  const classes = useStyles(theme)

  useEffect(() => {
    ;(async () => {
      if (store.industries.length === 0) {
        try {
          const response = await getIndustries()

          store.setIndustries(response)
        } catch (error) {
          console.error(error)
        }
      }
    })()
  }, [])

  if (!store.results) {
    return <div>loading results...</div>
  }

  const { maxPoints, userPoints, text } = store.results.surveyResult
  const { categories, userBestInCategory, userWorstInCategory } = store.results
  const { industries } = store

  const convertArrayOfCategoriesToString = () => {
    let str = `${categories[0]}`
    categories.slice(1, categories.length - 1).forEach((category) => {
      str += `, ${category}`
    })
    str += ` and ${categories[categories.length - 1]}`

    return str
  }

  const listOfCategories = convertArrayOfCategoriesToString()

  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <Heading component="h1" variant="h5">
        DevOps Self Assessment
      </Heading>
      <p> Assess your DevOps cababilities here, lorem ipsum</p>
      <Grid container item direction="row" alignItems="center">
        <Hidden smDown>
          <Grid item md className={classes.image}>
            <img src="/leftside.png" width="100%" alt="Left banner" />
          </Grid>
        </Hidden>

        <Grid item xs={12} md={7}>
          <Paper className={classes.paper}>
            <Content>
              <ContentAnimationWrapper>
                <Typography variant="h2" className={classes.title}>
                  Your Results
                </Typography>
                <Typography variant="h4" className={classes.score}>
                  {Math.round(userPoints)} / {Math.round(maxPoints)}
                </Typography>
                <Typography variant="h6" className={classes.result}>
                  {text}
                </Typography>
                <ResultSummaryText data-testid="summarytext">
                  The tool assesses your DevOps capabilities in different
                  categories based on your answers. We have assessed your
                  capabilities in categories <strong>{listOfCategories}</strong>
                  . Your highest score was in the category
                  <strong> {userBestInCategory}</strong>, whereas you scored
                  lowest in
                  <strong> {userWorstInCategory}</strong>. Fill in the form
                  below to get your detailed results by email and see how to
                  improve your skills. You can also compare your results with
                  others in your industry or in the selected reference group.
                </ResultSummaryText>
                <ShareResultsGroup
                  text={text}
                  userPoints={userPoints} 
                  maxPoints={maxPoints}
                />
                <GetDetailedResultsForm industries={industries} />
              </ContentAnimationWrapper>
            </Content>
          </Paper>
        </Grid>
        <Hidden smDown>
          <Grid item md className={classes.image}>
            <img src="/rightside.png" width="100%" alt="Right banner" />
          </Grid>
        </Hidden>
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
