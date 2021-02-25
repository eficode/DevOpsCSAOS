import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Head from 'next/head'

import { InnerContentWrapper } from '../../components/shared/InnerContentWrapper'
import Button from '../../components/button'
import ProgressBar from '../../components/progressBar'
import { useStore } from '../../store'
import { getByEmail } from '../../services/users'
const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Montserrat;
  font-size: 16px;
  margin-bottom: 10px;
`

const FormTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 10px;s
`

const DetailsForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0 50px 0;
`

const DetailsInput = styled.input`
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
  font-family: Montserrat;
  padding: 10px 20px;
  border-radius: 10px;
  border-width: 0px;
  margin: 10px 0 50px 0;
`

const SignUpForm = () => {
  const [emailInput, setEmailInput] = useState('')
  const router = useRouter()
  const store = useStore()
  const firstQuestionHref = '/survey/questions/1'

  const handleEmailChange = (event) => {
    event.preventDefault()
    setEmailInput(event.target.value)
  }

  const updateEmail = async (event) => {
    event.preventDefault()
    store.setEmail(emailInput)
    router.push(firstQuestionHref)
  }

  return (
    <>
      <Head>
        <title>DevOps Capability Survey</title>
      </Head>
      <ProgressBar />
      <InnerContentWrapper>
        <Heading>DevOps Assessment Tool</Heading>
        <FormTitle>Add your contact details to get started</FormTitle>
        <DetailsForm id="email-input-field" onSubmit={updateEmail}>
          <DetailsInput
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={emailInput}
            onChange={handleEmailChange}
            required
          />
          <Button id="submit-email-button" type="submit">
            Begin
          </Button>
        </DetailsForm>
      </InnerContentWrapper>
    </>
  )
}

export default SignUpForm
