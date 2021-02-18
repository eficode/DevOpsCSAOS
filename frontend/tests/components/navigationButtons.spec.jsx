/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NavigationButtons from '../../components/navigationButtons'
import ThemeWrapper from '../testutils/themeWrapper'

describe('Navigation Buttons Component', () => {
  it('Renders next and back buttons', () => {
    render(
      <ThemeWrapper>
        <NavigationButtons currentQuestionId={3} surveyLength={5}/>
      </ThemeWrapper>
    )

    expect(screen.queryByText('Next'))
    expect(screen.queryByText('Back'))
  })

  it('Renders only next button if question is first in survey', () => {
    render(
      <ThemeWrapper>
        <NavigationButtons currentQuestionId={1} surveyLength={5}/>
      </ThemeWrapper>
    )

    expect(screen.queryByText('Next'))
    expect(screen.queryByText('Back')).not.toBeInTheDocument()
  })

  it('Renders only back button if question is last in survey', () => {
    render(
      <ThemeWrapper>
        <NavigationButtons currentQuestionId={5} surveyLength={5}/>
      </ThemeWrapper>
    )

    expect(screen.queryByText('Next')).not.toBeInTheDocument()
    expect(screen.queryByText('Back'))
  })
})
