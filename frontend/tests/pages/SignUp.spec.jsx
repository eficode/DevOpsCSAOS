/* eslint-disable no-undef */
import React from 'react'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'

import ContactForm from '../../pages/survey/signup'
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
