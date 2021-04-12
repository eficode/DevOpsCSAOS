/* eslint-disable max-len */
import React, { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useStore } from '../store'
import ContentAnimationWrapper from '../components/contentAnimationWrapper'
import { InnerContentWrapper } from '../components/shared/InnerContentWrapper'
import Link from '../components/link'
import ProgressBar from '../components/progressBar'
import Heading from '../components/heading'

const Section = styled.section`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Home = () => {
  const store = useStore()

  useEffect(() => {
    store.resetVersion()
    const url = window.location.search
    const version = new URLSearchParams(url).get('version')
    if (version) {
      store.setFeatureToggleSwitch(version)
    }
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
          </Section>
        </ContentAnimationWrapper>
      </InnerContentWrapper>
    </>
  )
}

export default Home
