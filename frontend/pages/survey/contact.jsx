import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import Link from 'next/link'
import { ContentWrapper } from '../../components/shared/ContentWrapper'
import Button from '../../components/button'
import ProgressBar from '../../components/progressBar'
import { useStore } from '../../store'

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Montserrat;
  font-size: 16px;
  margin-bottom: 10px;
`

const FormTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 10px;
`

const DetailsForm = styled.form`
  display: flex;
  margin: 50px 0 50px 0;
`

const DetailsInput = styled.input`
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
  font-family: Montserrat;
  padding: 10px 20px;
  border-radius: 10px;
  border-width: 0px;
  margin: 10px;
`

const ContactForm = () => {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const store = useStore()
  const firstQuestionHref = '/survey/questions/1'

  const handleEmailChange = (event) => {
    event.preventDefault()
    setEmail(event.target.value)
  }

  const updateEmail = (value) => {
    store.email = value
  }

  return (
    <ContentWrapper>
      <ProgressBar />
      <Heading>DevOps Assessment Tool</Heading>
      <FormTitle>Add your contact details to get started</FormTitle>
      <DetailsForm onSubmit={updateEmail(email)}>
        <DetailsInput type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
      </DetailsForm>
      <Link href={firstQuestionHref} passHref>
        <Button type="submit">
          Next
        </Button>
      </Link>
    </ContentWrapper>
  )
}

export default ContactForm
