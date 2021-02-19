/* eslint-disable no-undef */

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { useStore } from '../../store'

import ContactForm from '../../pages/survey/contact'
import ThemeWrapper from '../testutils/themeWrapper'

nextRouter.useRouter = jest.fn()
useRouter.mockImplementation(() => ({
  route: '/survey/contact', 
  pathname: '/survey/contact', 
  asPath: '', 
  push: jest.fn(),
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
  it('Valid email is saved to store', async () => {
    render(
      <ThemeWrapper>
        <ContactForm />
      </ThemeWrapper>,
    )

    userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com')
    userEvent.click(screen.getByRole('button', { name: 'Begin' }))

    const stateAfterClick = useStore.getState()
    expect(stateAfterClick.email).toBe('test@test.com')
  })
})
