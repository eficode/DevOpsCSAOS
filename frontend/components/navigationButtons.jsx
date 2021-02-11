import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import Button from '../components/button'

const NavButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const NavigationButtons = ({ currentQuestionId, surveyLength }) => {
  const prevQUrl = `/survey/questions/${currentQuestionId - 1}`
  const nextQUrl = `/survey/questions/${currentQuestionId + 1}`

  const isFirstQuestion = currentQuestionId === 1
  const isLastQuestion = currentQuestionId === surveyLength

  return (
    <NavButtonWrapper>
      {!isFirstQuestion && 
        <Link href={prevQUrl} passHref>
          <Button type="secondary">
            Back
          </Button>
        </Link>
      }
      {!isLastQuestion && 
        <Link href={nextQUrl} passHref>
          <Button type="primary">
            Next
          </Button>
        </Link>
      }
    </NavButtonWrapper>
  )
}

export default NavigationButtons
