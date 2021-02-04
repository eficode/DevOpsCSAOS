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
      <form>
        <input type="email" id="email" name="email" value="Business email" />
      </form>

      <Link href={firstQuestionHref} passHref>
        <Button type="submit">
          Next
        </Button>
      </Link>
    </ContentWrapper>
  )
}

export default ContactForm
