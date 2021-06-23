/* eslint-disable max-len */
import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'

import { SummaryAndScorePageWrapper} from '../components/shared/SummaryAndScorePageWrapper'
import { ProgressBar } from '../components/progressBar'
import Heading from '../components/heading'
import StyledLink from '../components/link'

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  background-color: white;
  border-radius: 0.5rem;
`

const PrivacyTextContainer = styled.div`
  margin-top: 1em;
  p {
    font-size:12px;
    text-align: left;
  }
`

const Privacy = () => (
  <>
    <Head>
      <title>DevOps Capability Survey</title>
    </Head>
    <ProgressBar />
    <SummaryAndScorePageWrapper>
      <Content>
        <Heading component="h1" variant="h6">
          DevOps Capability Survey Privacy Policy
        </Heading>
        <PrivacyTextContainer>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et netus et. Elementum integer enim neque volutpat ac tincidunt. Leo vel orci porta non pulvinar neque laoreet. Diam ut venenatis tellus in metus vulputate. Risus viverra adipiscing at in tellus. Turpis tincidunt id aliquet risus feugiat in ante metus. Nullam eget felis eget nunc. Molestie a iaculis at erat pellentesque adipiscing. Pharetra sit amet aliquam id diam maecenas ultricies mi. Mi bibendum neque egestas congue. Volutpat sed cras ornare arcu dui vivamus arcu. Eget nunc scelerisque viverra mauris in aliquam. Ornare massa eget egestas purus viverra accumsan in. Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Consequat id porta nibh venenatis. Orci ac auctor augue mauris augue neque. Leo urna molestie at elementum eu.
          </p>
          <p>
            Semper auctor neque vitae tempus quam pellentesque. Eget egestas purus viverra accumsan in nisl nisi scelerisque. Molestie nunc non blandit massa enim nec dui nunc. Vitae semper quis lectus nulla at volutpat. Mi sit amet mauris commodo quis imperdiet massa. Rutrum tellus pellentesque eu tincidunt tortor aliquam. Egestas fringilla phasellus faucibus scelerisque eleifend donec. Hac habitasse platea dictumst quisque. Aliquam vestibulum morbi blandit cursus. Quis vel eros donec ac odio tempor orci dapibus ultrices. Et egestas quis ipsum suspendisse ultrices. Habitant morbi tristique senectus et netus et malesuada.
          </p>
          <p>
            Amet facilisis magna etiam tempor orci eu lobortis elementum. Odio euismod lacinia at quis risus. Et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Mattis ullamcorper velit sed ullamcorper. Amet venenatis urna cursus eget nunc scelerisque viverra mauris in. Sit amet mattis vulputate enim nulla. Sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum. Lectus sit amet est placerat in egestas erat. Ut aliquam purus sit amet luctus. Vehicula ipsum a arcu cursus vitae congue mauris. Neque egestas congue quisque egestas diam in arcu cursus euismod. Magna eget est lorem ipsum dolor sit. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Ac ut consequat semper viverra nam libero justo laoreet.
          </p>
        </PrivacyTextContainer>
        <StyledLink type="primary" href="/survey/result/">
          Back to result page
        </StyledLink>
      </Content>
    </SummaryAndScorePageWrapper>
  </>
)

export default Privacy
