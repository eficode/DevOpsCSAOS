/* eslint-disable max-len */
import React, { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'

import ContentWrapper from '../components/contentWrapper'
import getAll from '../services/questions'
import { useStore } from '../store'

const Header = styled.header``
const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.blueDianne};
`

const Main = styled.main`
  padding: 5rem;
  background-color: #fff;

  p {
    text-align: center;
    line-height: 1.6;
    padding: 0.5rem;
  }

  button {
    padding: 1rem 1.5rem;
    background-color: ${({ theme }) => theme.colors.easternBlue};
  }
`

const Home = (props) => {
  const { questions } = props
  useEffect(() => {
    // set the questions to state to make them available throughout client
    useStore.setState({ questions })
  }, [])

  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ContentWrapper>
        <Header>
          <Heading>DevOps Assessment Tool</Heading>
        </Header>
        <Main>
          <h1>Welcome!</h1>
          <p>Test your DevOps capabilities here.</p>
        </Main>

        <Link href="/survey/questions/1" passHref>
          <span>Get started</span>
        </Link>
      </ContentWrapper>
    </>
  )
}

export async function getStaticProps() {
  // fetch all pre-defined questions
  const questions = await getAll()
  return {
    props: { questions }, // will be passed to the page component as props
  }
}

export default Home
