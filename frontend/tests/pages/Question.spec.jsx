/* eslint-disable no-undef */
import React from 'react'
import { render, mount } from 'enzyme'
import { useRouter } from 'next/router'
import * as nextRouter from 'next/router';

import Question from '../../pages/survey/questions/[questionId]'
import ThemeWrapper from '../testutils/themeWrapper';

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
  {
    id: '1',
    text: 'Maistuisiko laskiaispulla?',
    weight: 9.9,
    categoryId: 2,
    createdAt: '2021-02-03T07:34:56.445Z',
    updatedAt: '2021-02-03T07:34:56.445Z',
    Category: { name: 'Pullat' },
  },
]

nextRouter.useRouter = jest.fn();

describe('Question rendering', () => {
  useRouter.mockImplementation(() => ({
    route: '/survey/questions/1',
    pathname: 'survey/questions/1',
    query: { questionId: '1' },
    asPath: '',
  }))

  it('Component is rendered', () => {
    const component = render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>,
    )
    expect(component.text()).toContain('DevOps Assessment Tool')
  })

  it('The question whose id is in route is rendered', () => {
    const component = render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>,
    )
    expect(component.text()).toContain('Oletko ruisleipä?')
  })

  it('The right "Question q_id/survey_length" params are rendered', () => {
    const component = render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>,
    )
    expect(component.text()).toContain('Question 1/2')
  })
})

describe('Survey navigation', () => {
  it('Not last question renders link with text Next', () => {
    useRouter.mockImplementationOnce(() => ({
      route: '/survey/questions/1',
      pathname: 'survey/questions/1',
      query: { questionId: '1' },
      asPath: '',
    }))

    const component = mount(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>,
    )

    expect(component.text().includes('Next')).toBe(true)
  })

  it('Last question renders link with text Get results', () => {
    useRouter.mockImplementationOnce(() => ({
      route: '/survey/questions/2',
      pathname: 'survey/questions/2',
      query: { questionId: '2' },
      asPath: '',
    }))

    const component = mount(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>,
    )
    expect(component.text().includes('Get results')).toBe(true)
  })
})
