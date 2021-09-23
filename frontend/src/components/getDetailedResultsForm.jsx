/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { useState } from 'react'
import styled from 'styled-components'
import { isEmail } from 'validator'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import IconButton from '@material-ui/core/IconButton'
import Button from './button'
import ChallengeSelector from './challengeSelector'
import RoleSelector from './roleSelector'
import { useStore } from '../store'
import { submitEmail } from '../services/routes'

const FormBackGround = styled.div`
  width: 100%;
  background: #f0f0ec;
  border-radius: 20px;
  font-family: Montserrat !important;
`

const FormTitle = styled.h3`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Montserrat;
  padding-top: ${(props) => (props.noPaddingTop ? '0px' : '1rem')};
`

const DetailsForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6vh 0 6vh 0;
`

const DetailsInput = styled.input`
  background-color: white;
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
  text-align: left;
  a {
    font-weight: bold;
    text-decoration: underline;
    text-color: black;
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
  font-size: 0.7rem;
`

const Info = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  width: 200px;
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
  position: absolute;
  left: 63%;
  z-index: 1;
  font-size: 12px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 5px 10px #999999;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    left: 33%;
  }
`

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: '0.7rem',
    marginBottom: '-3vh',
    fontWeight: 'bold',
    color: '#ff6600',
    [theme.breakpoints.down('sm')]: {
      margin: '1vh',
    },
  },
}))

const StyledIcon = styled(InfoOutlinedIcon)``

const GetDetailedResultsForm = ({ roles, challenges, setShowSubmitSellText }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const store = useStore()
  const [emailInput, setEmailInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [createGroupChecked, setCreateGroupChecked] = useState(false)
  const [
    agreeToPrivacyPolicyChecked,
    setAgreeToPrivacyPolicyChecked,
  ] = useState(false)
  const [emailDisplayAlert, setEmailDisplayAlert] = useState(false)
  const [roleDisplayAlert, setRoleDisplayAlert] = useState(false)
  const [challengeDisplayAlert, setChallengeDisplayAlert] = useState(false)
  const [privacyDisplayAlert, setPrivacyDisplayAlert] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(0)
  const [selectedChallenge, setSelectedChallenge] = useState(0)

  const handleEmailChange = (event) => {
    event.preventDefault()
    setEmailInput(event.target.value)
    setEmailDisplayAlert(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!isEmail(emailInput)) {
      setEmailDisplayAlert(true)
      return
    }

    if (!store.userSelectedRole) {
      setRoleDisplayAlert(true)
      return
    }

    if (!store.userSelectedChallenge) {
      setChallengeDisplayAlert(true)
      return
    }

    if (!agreeToPrivacyPolicyChecked) {
      setPrivacyDisplayAlert(true)
      return
    }

    const groupId = store.groupId === '' ? undefined : store.groupId
    const userRole = store.userSelectedRole
    const userChallenge = store.userSelectedChallenge
    const industryId = store.userSelectedIndustry === '' ? undefined : store.userSelectedIndustry
    await submitEmail(
      store.userToken,
      emailInput,
      createGroupChecked,
      groupId,
      industryId,
      store.userQuestionAnswerPairs,
      userRole,
      userChallenge
      
    )
    setSubmitted(true)
    setShowSubmitSellText(false)
  }
  const handleRoleSelectChange = () => {
    setRoleDisplayAlert(false)
    setChallengeDisplayAlert(false)
  }

  const handleChallengeSelectChange = () => {
    setChallengeDisplayAlert(false)
    setRoleDisplayAlert(false)
  }

  const handleCreateGroupChange = (event) => {
    setCreateGroupChecked(event.target.checked)
  }

  const handleAgreeToPolicyChange = (event) => {
    setAgreeToPrivacyPolicyChecked(event.target.checked)
    setPrivacyDisplayAlert(false)
  }

  if (submitted) {
    return (
      <FormBackGround>
        <FormTitle noPaddingTop>
          Thank you! Check your email for detailed results and instructions.
        </FormTitle>
      </FormBackGround>
    )
  }

  return (
    <FormBackGround onClick={() => infoOpen && setInfoOpen(false)}>
      <DetailsForm id="email-input-field" onSubmit={handleSubmit}>
        <FieldWrapper>
          <DetailsInput
            id="email"
            name="email"
            placeholder="Email"
            value={emailInput}
            onChange={handleEmailChange}
          />
         <RoleSelector
            roles={roles}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            displayAlert={handleRoleSelectChange}
          />
          <ChallengeSelector
            challenges={challenges}
            selectedChallenge={selectedChallenge}
            setSelectedChallenge={setSelectedChallenge}
            displayAlert={handleChallengeSelectChange}
          />
          <CheckboxContainer>
            <StyledCheckbox
              checked={agreeToPrivacyPolicyChecked}
              onChange={handleAgreeToPolicyChange}
              name="acceptPrivacyPolicy"
              style={{
                color: '#1E3944',
              }}
            />
            <CheckBoxText>
              In order to provide you the content requested, we need to store
              and process your personal data. If you consent to us storing your
              personal data for this purpose, please tick this checkbox.
              {'\u00A0'}
              <a href="https://www.eficode.com/privacy-policy/" target="_blank">
                Privacy policy
              </a>
            </CheckBoxText>
          </CheckboxContainer>
          {store.groupId === '' && (
            <CheckboxContainer>
              <StyledCheckbox
                checked={createGroupChecked}
                onChange={handleCreateGroupChange}
                name="checked"
                style={{
                  color: '#1E3944',
                }}
              />
              <CheckBoxText>
                Let me share and compare my results with my colleagues
              </CheckBoxText>
              <StyledIconButton
                aria-label="info"
                component="span"
                onClick={() => setInfoOpen(!infoOpen)}
              >
                <StyledIcon style={{ fontSize: 20 }} />
              </StyledIconButton>
              <Info open={infoOpen}>
                By checking this box you will be given a link that you can share
                with your colleagues. Once they have taken the survey, you can
                compare the results with the group.{' '}
              </Info>
            </CheckboxContainer>
          )}
        </FieldWrapper>
        <Button id="submit-email-button" type="submit">
          Submit
        </Button>
        {emailDisplayAlert ? (
          <Typography variant="body" className={classes.text}>
            Please enter a valid email.
          </Typography>
        ) : null}
        {roleDisplayAlert ? (
          <Typography variant="body" className={classes.text}>
            Please select your role in your organization.
          </Typography>
        ) : null}
        {challengeDisplayAlert ? (
          <Typography variant="body" className={classes.text}>
            Please select a challenge you are trying to solve.
          </Typography>
        ) : null}
        {privacyDisplayAlert ? (
          <Typography variant="body" className={classes.text}>
            Please accept the privacy policy before submitting your email.
          </Typography>
        ) : null}
      </DetailsForm>
    </FormBackGround>
  )
}

export default GetDetailedResultsForm
