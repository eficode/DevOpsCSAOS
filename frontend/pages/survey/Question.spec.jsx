/* eslint-disable no-undef */
import React from 'react'
import { render } from 'enzyme'
import { useRouter } from 'next/router'
import * as nextRouter from 'next/router';
import { ThemeProvider } from 'styled-components'

import Question from './questions/[questionId]'
import theme from '../../styles/theme';

describe('Question', () => {
  const questions = [
    {
      id: '0',
      text: 'Oletko ruisleipä?',
      weight: 0.8,
      categoryId: 1,
      createdAt: '2021-02-03T07:34:56.445Z',
      updatedAt: '2021-02-03T07:34:56.445Z',
      Category: { name: 'Jauhot' },
    },
  ]

  nextRouter.useRouter = jest.fn();

  it('Question is rendered', () => {
    useRouter.mockImplementationOnce(() => ({
      route: '/survey/questions/1',
      pathname: 'survey/questions/1',
      query: { questionId: '1' },
      asPath: '',
    }))
    const component = render(
      <ThemeProvider theme={theme}>
        <Question questions={questions} />
      </ThemeProvider>,
    )
    expect(component.text()).toContain('DevOps Assessment Tool')
  })
})
