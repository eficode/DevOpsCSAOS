import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import Link from 'next/link'
import { ContentWrapper } from '../../components/shared/ContentWrapper'
import Button from '../../components/button'
import { create } from '../../services/users'

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne}
`

const FormTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne}
`

const DetailsForm = styled.form`
  display: flex;
`

const DetailsInput = styled.input`
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
  font-family: inherit;
  padding: 10px 20px;
  border-radius: 10px;
  border-width: 0px;
  margin: 10px;
`

const ContactForm = () => {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const firstQuestionHref = '/survey/questions/1'

  const handleEmailChange = (event) => {
    event.preventDefault()
    setEmail(event.target.value)
  }

  return (
    <ContentWrapper>
      <Heading>DevOps Assessment Tool</Heading>
      <FormTitle>Add your contact details to get started</FormTitle>
      <DetailsForm>
        <DetailsInput type="email" id="email" name="email" value="Business email" />
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
