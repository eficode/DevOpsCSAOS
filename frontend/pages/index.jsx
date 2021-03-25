/* eslint-disable max-len */
import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'

import { InnerContentWrapper } from '../components/shared/InnerContentWrapper'
import Link from '../components/link'
import ProgressBar from '../components/progressBar'
import { LinearProgress } from '@material-ui/core'

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.blueDianne};
  margin-top: 30px;
`

const Main = styled.main`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Home = () => (
  <>
    <motion.div
      key="siteIndex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -1000 }}
    >
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <InnerContentWrapper>
        <Heading>DevOps Assessment Tool</Heading>
        <Main>
          <h2>Welcome!</h2>
          <p>Test your DevOps capabilities here.</p>
          <Link href='/survey/signup' type='primary'>
            Get started
          </Link>

        </Main>
      </InnerContentWrapper>
    </motion.div>
  </>
)

export default Home
