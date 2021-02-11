/* eslint-disable no-undef */
import React from 'react'
import { mount } from 'enzyme'
import NavigationButtons from '../../components/navigationButtons'
import ThemeWrapper from '../testutils/themeWrapper'

describe('Navigation Buttons Component', () => {
  it('Renders next and back buttons', () => {
    const component = mount(
      <ThemeWrapper>
        <NavigationButtons currentQuestionId={3} surveyLength={5}/>
      </ThemeWrapper>
    )

    expect(component.text()).toContain('Next')
    expect(component.text()).toContain('Back')
  })

  it('Renders only next button if question is first in survey', () => {
    const component = mount(
      <ThemeWrapper>
        <NavigationButtons currentQuestionId={1} surveyLength={5}/>
      </ThemeWrapper>
    )

    expect(component.text()).toContain('Next')
    expect(component.text()).not.toContain('Back')
  })

  it('Renders only back button if question is last in survey', () => {
    const component = mount(
      <ThemeWrapper>
        <NavigationButtons currentQuestionId={5} surveyLength={5}/>
      </ThemeWrapper>
    )

    expect(component.text()).not.toContain('Next')
    expect(component.text()).toContain('Back')
  })
})
