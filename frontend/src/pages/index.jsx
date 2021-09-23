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
import { getBaseUrl, getIndustries, getAllQuestions } from '../services/routes'

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
      window.parent.postMessage(entries[0].target.clientHeight + 200, '*')
    })

    resizeObserver.observe(document.body)
    const url = new URLSearchParams(window.location.search)
    const version = url.get('version')
    const groupId = url.get('groupid')
    const user = url.get('user')
    if (user) {
      router.push(`/survey/total_results/?user=${user}`)
      return
    }
    if (version) {
      store.setFeatureToggleSwitch(version)
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
    router.push('/survey/questions/?id=1', null, {
      shallow: true,
    })
  }

  return store.industries.length === 0 &&
    store.questions.length === 0 ? null : (
      <Grid
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        className={classes.content}
      >
        <Grid item>
          <Head>
            <title>DevOps Capability Survey</title>
          </Head>
          <Typography variant="h5" className={classes.heading}>
            DevOps self-assessment
          </Typography>
        </Grid>
        <Grid container item className={classes.contentRow}>
          <Grid item md={2} className={classes.image}>
            <img src="/leftside.png" width="100%" alt="Left banner" />
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper>
              <Grid item className={classes.card}>
                <ContentAnimationWrapper>
                  <Typography variant="h6" className={classes.heading}>
                    Welcome! <br />
                    Are you doing DevOps right?
                  </Typography>

                  <Typography variant="body1" className={classes.text}>
                    Answer the following {store.questions.length} questions to
                    receive feedback on your DevOps practices and capabilities.
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
        <Box textAlign="center" marginTop="20px">
          <img src="/logo.png" alt="Logo" width={120} height={90} />
        </Box>
      </Grid>
  )
}

export default Home
