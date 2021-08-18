/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { checkGroupId } from '../services/routes'
import { useStore } from '../store'
import { SummaryAndScorePageWrapper} from '../components/shared/SummaryAndScorePageWrapper'
import Link from '../components/link'
import Heading from '../components/heading'

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

const Home = () => {
  const store = useStore()
  const router = useRouter()
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
        console.log('from index',entries[0].target.clientHeight)
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
                Group id found with the URL is invalid for some reason. <br />
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
