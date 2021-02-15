/* eslint-disable no-undef */

import React from 'react'
import { render, fireEvent, getByLabelText } from '@testing-library/react'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { useStore } from '../../store'

import ContactForm from '../../pages/survey/contact'
import ThemeWrapper from '../testutils/themeWrapper'

nextRouter.useRouter = jest.fn()
useRouter.mockImplementation(() => ({
  route: '/survey/contact', pathname: '/survey/contact', asPath: '', push: jest.fn(),
}))

describe('Contactform rendering', () => {
  it('A Component is rendered', () => {
    const component = render(
      <ThemeWrapper>
        <ContactForm />
      </ThemeWrapper>,
    )

    expect(component.container).toHaveTextContent('DevOps Assessment Tool')
  })
})

describe('Email validation', () => {
  // it('Invalid email is not saved to store', () => {
  //   const component = render(
  //     <ThemeWrapper>
  //       <ContactForm />
  //     </ThemeWrapper>,
  //   )

  //   const initialState = useStore.getState()
  //   expect(initialState.email).toBe('')

  //   const inputField = component.container.querySelector('input')
  //   const form = component.container.querySelector('form')
  //   const beforeAfterClick = useStore.getState()
  //   expect(beforeAfterClick.email).toBe('')

  //   fireEvent.change(inputField, {
  //     target: { value: 'test.com' },
  //   })
  //   fireEvent.click(component.getByText('Begin'))

  //   const stateAfterClick = useStore.getState()
  //   expect(stateAfterClick.email).toBe('')
  // })

  it('Valid email is saved to store', () => {
    const component = render(
      <ThemeWrapper>
        <ContactForm />
      </ThemeWrapper>,
    )

    const inputField = component.container.querySelector('input')
    const form = component.container.querySelector('form')

    fireEvent.change(inputField, {
      target: { value: 'test@test.com' },
    })
    fireEvent.submit(form)

    const stateAfterClick = useStore.getState()
    expect(stateAfterClick.email).toBe('test@test.com')
  })
})
