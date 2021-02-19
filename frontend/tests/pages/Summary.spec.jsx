/* eslint-disable no-undef */
import React from 'react'
import {
  render, screen, act,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { useStore } from '../../store'

import Summary from '../../pages/survey/questions/summary'
import ThemeWrapper from '../testutils/themeWrapper'

nextRouter.useRouter = jest.fn()

describe.only('Component rendering', () => {
  useRouter.mockImplementation(() => ({
    route: '/survey/summary/',
    pathname: 'survey/summary',
    asPath: '',
  }))

  it('Component is rendered', () => {
    render(
      <ThemeWrapper>
        <Summary/>
      </ThemeWrapper>,
    )
    expect(screen.getByText('Here are your current answers')).toBeInTheDocument()
  })
})