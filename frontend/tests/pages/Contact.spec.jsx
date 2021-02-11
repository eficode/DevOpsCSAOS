/* eslint-disable no-undef */
import React from 'react'

import * as nextRouter from 'next/router'
import { render, mount } from 'enzyme'
import { useRouter } from 'next/router'
import { useStore } from '../../store'

import ContactForm from '../../pages/survey/contact'
import ThemeWrapper from '../testutils/themeWrapper'

nextRouter.useRouter = jest.fn()

describe('Contactform rendering', () => {
  useRouter.mockImplementation(() => ({
    route: '/survey/contact',
    pathname: 'survey/contact',
    asPath: '',
  }))

  it('A Component is rendered', () => {
    const component = render(
      <ThemeWrapper>
        <ContactForm />
      </ThemeWrapper>,
    )

    expect(component.text()).toContain('DevOps Assessment Tool')
  })
})

describe('Email validation', () => {
  it('Entering invalid email gives error and does not proceed', () => {
    const component = mount(
      <ThemeWrapper>
        <ContactForm />
      </ThemeWrapper>,
    )

    const initialState = useStore.getState()
    expect(initialState.email).toBe('')

    const inputField = component.find('input')
    inputField.value = 'invalidEmail'
    console.log(inputField.debug())

    const button = component.find('button[children="Begin"]')
    button.simulate('click')

    const stateAfterClick = useStore.getState()
    expect(stateAfterClick.email).toBe('')
  })
})
