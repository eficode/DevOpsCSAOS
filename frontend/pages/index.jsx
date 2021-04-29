/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { checkGroupId } from '../services/routes'
import { useStore } from '../store'
import { ContentAnimationWrapper } from '../components/contentAnimationWrapper'
import { InnerContentWrapper } from '../components/shared/InnerContentWrapper'
import Link from '../components/link'
import { ProgressBar } from '../components/progressBar'
import Heading from '../components/heading'

const Section = styled.section`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ErrorMessage = styled.div`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.brandyPunch};
  padding: 20px;
  width: 80%;
  font-size: 12px;
  color: white;
  margin-top: 20px;
  line-height: 1.6;
`

const Home = () => {
  const store = useStore()
  const [showGroupIdInvalidText, setShowGroupIdInvalidText] = useState(false)
  useEffect(() => {
    (async () => {
      store.resetVersion()
      // eslint-disable-next-line no-undef
      const url = new URLSearchParams(window.location.search)
      const version = url.get('version')
      const groupId = url.get('groupid')
      if (version) {
        store.setFeatureToggleSwitch(version)
      }
      if (groupId) {
        const { result: isValidGroupId } = await checkGroupId(groupId)
        if (isValidGroupId) {
          store.setGroupId(groupId)
        } else {
          setShowGroupIdInvalidText(true)
        }
      }
    })()
  }, [])
  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ProgressBar />
      <InnerContentWrapper>
        <ContentAnimationWrapper>
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
                Group id found with the URL is invalid for some reason :(
                {' '}
                <br />
                You can still complete the survey, but the results won&#39;t be
                added to the group.
              </ErrorMessage>
            )}
          </Section>
        </ContentAnimationWrapper>
      </InnerContentWrapper>
    </>
  )
}

export default Home
