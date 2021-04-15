import React, { useState } from 'react'
import styled from 'styled-components'
import { isEmail } from 'validator'
import Checkbox from '@material-ui/core/Checkbox'
import { submitEmail } from '../services/answers'
import Button from './button'
import IndustrySelector from './industrySelector'
import { useStore } from '../store'

const FormBackGround = styled.div`
  width: 80%;
  margin-top: 30px;
  padding: 15px;
`

const FormTitle = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 10px;
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
  margin: 0 0 10px 0;
`

const GroupLinkCheckBoxWrapper = styled.div``

const CheckBoxText = styled.label`
  font-size: 13px;
`

const GetDetailedResultsForm = () => {
  const store = useStore()
  const [emailInput, setEmailInput] = useState('')
  const [checked, setChecked] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const handleEmailChange = (event) => {
    event.preventDefault()
    setEmailInput(event.target.value)
  }

  const updateEmail = async (event) => {
    event.preventDefault()

    if (!isEmail(emailInput)) {
      alert('Please provide a valid email address')
    } else {
      // for group generation you need to pass checkbox value and surveyID
      // from store, add them to service and handle them in endpoint.
      await submitEmail(store.userToken, emailInput).then(setSubmitted(true))
    }
  }

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }
  if (!submitted) {
    return (
      <FormBackGround>
        <FormTitle>Get your detailed results</FormTitle>
        <DetailsForm id="email-input-field" onSubmit={updateEmail}>
          <DetailsInput
            id="email"
            name="email"
            placeholder="Email"
            value={emailInput}
            onChange={handleEmailChange}
            required
          />
          {emailInput && (
            <>
              <GroupLinkCheckBoxWrapper>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  name="checked"
                  style={{
                    color: '#1E3944',
                  }}
                />
                <CheckBoxText>Create a group</CheckBoxText>
              </GroupLinkCheckBoxWrapper>
              <IndustrySelector />
            </>
          )}
          <Button id="submit-email-button" type="submit">
            Mail me!
          </Button>
        </DetailsForm>
      </FormBackGround>
    )
  }
  return (
    <FormBackGround>
      <FormTitle>
        Thank you! Check your email for detailed results and instructions.
      </FormTitle>
    </FormBackGround>
  )
}

export default GetDetailedResultsForm
