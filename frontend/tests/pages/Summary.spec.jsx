import React from 'react'
import { render, mount } from 'enzyme'
import { useRouter } from 'next/router'
import { useStore } from '../../store'
import * as nextRouter from 'next/router'
import Summary from '../../pages/survey/questions/summary'
import ThemeWrapper from '../testutils/themeWrapper'
import { questions } from './constants'

nextRouter.useRouter = jest.fn()

describe('Summary page', () => {
  useRouter.mockImplementation(() => ({
    route: '/survey/result',
    pathname: 'survey/result',
    asPath: '',
  }))

  it('renders the correct heading', () => {
    const component = render(
      <ThemeWrapper>
        <Summary />
      </ThemeWrapper>
    )

    expect(component.text()).toContain("Here's what you've answered")
  })
})
