import React, { useState } from 'react'
import styled from 'styled-components'
import { isEmail } from 'validator'
import Link from 'next/link'
import Checkbox from '@material-ui/core/Checkbox'
import IndustrySelector from './industrySelector'
import Button from '../components/button'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import IconButton from '@material-ui/core/IconButton'

const FormBackGround = styled.div`
  width: 85%;
  margin-top: 30px;
  padding: 15px;
  background: #99c2d0;
  border-radius: 20px;

  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.wideMobile}) {
    width: 95%;
    padding: 5px;
  }
`

const FormTitle = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 10px;
  padding-top: 30px;
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
  ::placeholder {
    color: #000;
  }
  color: #000;
  width: 100%;
`

const CheckboxContainer = styled.div`
  margin-top: 10px;

  a {
    font-weight: bold;
    text-decoration: underline;
  }
`

const FieldWrapper = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 0 10%;
`

const StyledCheckbox = styled(Checkbox)`
  padding: 0;
  margin-right: 5px;
`

const StyledIconButton = styled(IconButton)`
  padding: 3px;
  color: rgb(30, 57, 68);
`

const CheckBoxText = styled.label`
  font-size: 13px;
`

const Info = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  width: 200px;
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
  position: absolute;
  left: 46%;
  z-index: 1;
  font-size: 12px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 5px 10px #999999;

  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.wideMobile}) {
    left: 33%;
  }
`
const StyledIcon = styled(InfoOutlinedIcon)``

const GetDetailedResultsForm = ({ industries }) => {
  const [emailInput, setEmailInput] = useState('')
  const [createGroupChecked, setCreateGroupChecked] = useState(false)
  const [
    agreeToPrivacyPolicyChecked,
    setAgreeToPrivacyPolicyChecked,
  ] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [selectedIndustry, setSelectedIndustry] = useState(0)

  const handleEmailChange = (event) => {
    event.preventDefault()
    setEmailInput(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!agreeToPrivacyPolicyChecked) {
      alert('You need to agree to the privacy policy')
      return
    }

    if (!isEmail(emailInput)) {
      alert('Please provide a valid email address')
      return
    }

    alert('This is a submit placeholder! add email sendin here!')
  }

  const handleCreateGroupChange = (event) => {
    setCreateGroupChecked(event.target.checked)
  }

  const handleAgreeToPolicyChange = (event) => {
    setAgreeToPrivacyPolicyChecked(event.target.checked)
  }

  return (
    <FormBackGround onClick={() => infoOpen && setInfoOpen(false)}>
      <FormTitle>Get your detailed results</FormTitle>
      <DetailsForm id="email-input-field" onSubmit={handleSubmit}>
        <FieldWrapper>
          <DetailsInput
            id="email"
            name="email"
            placeholder="Email"
            value={emailInput}
            onChange={handleEmailChange}
            required
          />
          <IndustrySelector
            industries={industries}
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
          />
          <CheckboxContainer>
            <StyledCheckbox
              checked={createGroupChecked}
              onChange={handleCreateGroupChange}
              name="checked"
              style={{
                color: '#1E3944',
              }}
            />
            <CheckBoxText>Create a group</CheckBoxText>
            <StyledIconButton
              aria-label="info"
              component="span"
              onClick={() => setInfoOpen(!infoOpen)}
            >
              <StyledIcon style={{ fontSize: 20 }} />
            </StyledIconButton>
            <Info open={infoOpen}>
              By checking this box, you will be given a group link that you can
              share with your friends. You will be able to compare your results
              to the group average after your friends have taken the survey.{' '}
            </Info>
          </CheckboxContainer>
          <CheckboxContainer>
            <StyledCheckbox
              checked={agreeToPrivacyPolicyChecked}
              onChange={handleAgreeToPolicyChange}
              name="checked"
              style={{
                color: '#1E3944',
              }}
            />
            <CheckBoxText>
              Agree to the <Link href={'/privacy/'}>Privacy policy</Link>
            </CheckBoxText>
          </CheckboxContainer>
        </FieldWrapper>
        <Button id="submit-email-button" type="submit">
          Submit
        </Button>
      </DetailsForm>
    </FormBackGround>
  )
}

export default GetDetailedResultsForm
