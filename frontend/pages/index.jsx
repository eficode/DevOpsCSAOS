/* eslint-disable max-len */
import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'
import Button from '../components/button'

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.blueDianne};
`

const Main = styled.main`
  padding: 5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    line-height: 1.6;
    padding: 0.5rem;
  }
`

const Home = () => (
  <>
    <Head>
      <title>DevOps Capability Survey</title>
    </Head>
    <>
      <Heading>DevOps Assessment Tool</Heading>
      <Main>
        <h2>Welcome!</h2>
        <p>Test your DevOps capabilities here.</p>
      </Main>
      <Link href="/survey/contact" passHref>
        <Button type="button">Get started</Button>
      </Link>
    </>
  </>
)

export default Home
