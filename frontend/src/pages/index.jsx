/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter, withRouter } from '../components/staticRouting'
import { checkGroupId } from '../services/routes'
import { useStore } from '../store'
import {
  useTheme,
  makeStyles,
  responsiveFontSizes,
} from '@material-ui/core/styles'
import StyledButton from '../components/button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { ContentAnimationWrapper } from '../components/contentAnimationWrapper'
import StartingPageForm from '../components/startingPageForm'
import { getBaseUrl, getIndustries, getAllQuestions, getSurveyData } from '../services/routes'
import { sortedIndex } from 'lodash'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '8px',
    margin: '0px',
    height: '100%',
    borderRadius: '12px',
    backgroundColor: '#F0F0EC',
    minHeight: '450px',
    textAlign: 'center',
    alignContent: 'center',
  },
  contentRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    float: 'none !important',
    paddingLeft: '1% !important',
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
  heading: {
    fontFamily: 'Montserrat',
    fontSize: '1.6rem',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: '5%',
    color: '#1E3944'
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    color: '#1E3944',
    marginTop: '1vh',
    marginBottom: '1vh',
    fontSize: '0.8rem',
    [theme.breakpoints.down('sm')]: {
      margin: '1vh',
    },
  },
  errorMessage: {
    fontFamily: 'Montserrat',
    borderRadius: '10px',
    backgroundColor: '#DD7F2F',
    padding: '10px',
    width: '100%',
    fontSize: '0.8rem',
    color: '#1E3944',
    marginTop: '20px',
    lineHeight: '1.4',
    justifyContent: 'center',
    justifySelf: 'center'
  },
}))

const Home = () => {
  const store = useStore()
  const router = useRouter()
  let theme = useTheme()
  theme = responsiveFontSizes(theme)
  const classes = useStyles(theme)
  const [showGroupIdInvalidText, setShowGroupIdInvalidText] = useState(false)
  const [userGroupValid, setUserGroupValid] = useState(-1)
  const [baseUrl, setBaseUrl] = useState('')

  // Redirect user to first question if user has no / or a valid group-parameter
  // Display landing page with information in case of invalid group-parameter
  // Redirect user to total results page if user token is present
  useEffect(async () => {
    // store.resetVersion()
    // eslint-disable-next-line no-undef
    const resizeObserver = new ResizeObserver((entries) => {
      const message = {height:entries[0].target.clientHeight + 200}
      window.parent.postMessage(message, '*')
    })

    resizeObserver.observe(document.body)
    const url = new URLSearchParams(window.location.search)
    const version = url.get('version')
    const groupId = url.get('groupid')
    const surveyParameter = url.get('survey')
    const user = url.get('user')
    if (user) {
      router.push(`/survey/total_results/?user=${user}`)
      return
    }
    if (version) {
      store.setFeatureToggleSwitch(version)
    }
    if (surveyParameter) {
      store.setSurvey(parseInt(surveyParameter))
    }
    if (groupId) {
      const { result: isValidGroupId } = await checkGroupId(groupId)
      if (isValidGroupId) {
        store.setGroupId(groupId)
        setUserGroupValid(1)
      } else {
        setShowGroupIdInvalidText(true)
        setUserGroupValid(0)
      }
    } else {
      setUserGroupValid(1)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      const url = new URLSearchParams(window.location.search)
      const surveyParameter = url.get('survey')
      
      if (store.questions.length === 0 || store.surveyId != surveyParameter) {
       
        try {
          const response = await getAllQuestions(surveyParameter)
          const surveyData = await getSurveyData(surveyParameter)
          store.setSurveyData(surveyData)
          store.setQuestions(response, store.featureToggleSwitch)
          store.setSurvey(surveyParameter)
        } catch (error) {
          console.error(error)
        }
      }
    })()
  }, [])

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

  const handleClick = () => {
    window.parent.postMessage('Started', '*')
    router.push('/survey/questions/?id=1', null, {
      shallow: true,
    })
  }

  return store.industries.length === 0 &&
    store.questions.length === 0 &&
    store.surveyId ? null : (
      <Grid
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        className={classes.content}
      >
        <Grid item>
          <Head>
            <title>Self-assessment tool</title>
          </Head>
          <Typography variant="h5" className={classes.heading}>
            {store.surveyHeader}
          </Typography>
        </Grid>
        <Grid container item className={classes.contentRow}>
          <Grid item md={2} className={classes.image}>
            <img src="/leftside.png" width="100%" alt="Left banner" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>
              <Grid item className={classes.card}>
                <ContentAnimationWrapper>
                  <Typography variant="h6" className={classes.heading}>
                    Welcome! <br />
                    {store.titleText}
                  </Typography>

                  <Typography variant="body1" className={classes.text}>
                    Answer the following {store.questions.length} questions to
                    receive feedback on your {store.flavorText}
                  </Typography>

                  <StartingPageForm industries={store.industries}/>

                  <Typography variant="body1" className={classes.text}>
                    Before answering the assessment, choose the industry you
                    work in to include industry wide averages to compare with
                    your personal result.
                  </Typography>
                  <StyledButton type="submit" onClick={handleClick}>
                    Get Started
                  </StyledButton>
                  {showGroupIdInvalidText && (
                    <Typography
                      variant="subtitle1"
                      className={classes.errorMessage}
                    >
                      Group id found with the URL is invalid. <br />
                      You can still complete the survey, but the results
                      won&#39;t be added to the group.
                    </Typography>
                  )}
                </ContentAnimationWrapper>
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={2} className={classes.image}>
            <img src="/rightside.png" width="100%" alt="Right banner" />
          </Grid>
        </Grid>
        <Box textAlign="center" marginTop="10vh">
          <img src="/logo.png" alt="Logo" width={120} height={90} />
        </Box>
      </Grid>
  )
}

export default Home
