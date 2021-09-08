/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useRouter, withRouter } from '../components/staticRouting'
import { checkGroupId } from '../services/routes'
import { useStore } from '../store'
import { SummaryAndScorePageWrapper} from '../components/shared/SummaryAndScorePageWrapper'
import {
  useTheme,
  makeStyles,
  responsiveFontSizes,
} from '@material-ui/core/styles'
import Link from '../components/link'
import Heading from '../components/heading'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { ContentAnimationWrapper } from '../components/contentAnimationWrapper'
import QuestionGrouper from '../components/questionGrouper'
import SingleQuestion from '../components/singleQuestion'

import StyledLink from '../components/link'
import NavigationGroup from '../components/navigationGroup'
import { allQuestionsAnswered, countOfAnsweredQuestions } from '../utils'
import StyledButton from '../components/button'
import { sendAnswers } from '../services/routes'

const Section = styled.section`
  background-color: #fff;
  display: grid;
  place-items: center;
`

const ErrorMessage = styled.div`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.brandyPunch};
  padding: 20px;
  width: 80%;
  font-size: 12px;
  color: #fff;
  margin-top: 20px;
  line-height: 1.6;
`

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '8px',
    margin: '0px',
    height: '100%',
    borderRadius: '12px',
    backgroundColor: '#F0F0EC',
  },
  rowGrid: {
    minHeight: '540px',
    [theme.breakpoints.down('sm')]: {
      minHeight: '540px',
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
  heading: {
    fontFamily: 'Montserrat',
    fontSize: '1.6rem',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: '5%',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    marginTop: '1vh',
    marginBottom: '5vh',
    [theme.breakpoints.down('sm')]: {
      margin: '1vh',
    },
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


  // Redirect user to first question if user has no / or a valid group-parameter
  // Display landing page with information in case of invalid group-parameter
  // Redirect user to total results page if user token is present
  useEffect(async () => {
      store.resetVersion()
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
    if(userGroupValid === 1) {
      router.push('/survey/questions/?id=1')
      }
  }, [userGroupValid])


  return (userGroupValid === 1 ||
    userGroupValid === -1 ? null :
      <>
      <Head>
        <title>DevOps Capability Survey</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SummaryAndScorePageWrapper>
          <Heading component="h1" variant="h5">
            DevOps Assessment Tool
          </Heading>
          <Section>
            <p>Welcome!</p>
            <p>Test your DevOps capabilities here.</p>
            <Link href="/survey/questions/?id=1" type="primary">
              Get started
            </Link>
            {showGroupIdInvalidText && (
              <ErrorMessage>
                Group id found with the URL is invalid. <br />
                You can still complete the survey, but the results won&#39;t be
                added to the group.
              </ErrorMessage>
            )}
          </Section>
      </SummaryAndScorePageWrapper> 
      </>
  )

  
  
  
}



export default Home
