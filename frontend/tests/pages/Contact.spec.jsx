/* eslint-disable no-undef */
import React from 'react'

import * as nextRouter from 'next/router'
import { render, mount, shallow } from 'enzyme'
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
    inputField.simulate('change', { target: { value: 'invalid email' } })
    console.log(inputField.debug())

    const button = component.find('button[children="Begin"]')
    button.simulate('click')

    const stateAfterClick = useStore.getState()
    expect(stateAfterClick.email).toBe('')
  })

  it('After submitting valid email, email is saved to store', () => {
  //   const component = mount(
  //     <ThemeWrapper>
  //       <ContactForm />
  //     </ThemeWrapper>,
  //   )

    //   const initialState = useStore.getState()
    //   expect(initialState.email).toBe('')

  //   const inputField = component.find('#email-input-field')
  //   component.find('#email').at(0).simulate('change', { target: { value: 'test@test.com' } })
  //   expect(component.find(ContactForm).dive().instance().state).toEqual({
  //     emailInput: 'test@test.com',
  //   })
  //   const button = component.find('#submit-email-button')
  //   button.simulate('click')
  //   const stateAfterClick = useStore.getState()
  //   expect(component.find(ContactForm).dive().instance().state).toHaveAttribute('test@test.com')
  })
})
