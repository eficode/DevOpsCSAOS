/* eslint-disable no-undef */
import React from 'react'
import { render, shallow } from 'enzyme'
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

    const component = render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>,
    )

    expect(component.find('a').text()).toContain('Next')
  })

  it('Last question renders link with text Get results', () => {
    useRouter.mockImplementationOnce(() => ({
      route: '/survey/questions/2',
      pathname: 'survey/questions/2',
      query: { questionId: '2' },
      asPath: '',
    }))

    const component = render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>,
    )

    expect(component.find('a').text()).toContain('Get results')
  })

  it.only('Clicking next button renders next question', () => {
    useRouter.mockImplementationOnce(() => ({
      route: '/survey/questions/1',
      pathname: 'survey/questions/1',
      query: { questionId: '1' },
      asPath: '',
    }))

    /*
    HOX SEURAAVA:
    click ei saatu vielä toimimaan :((
    -> render():lla ei ole olemassa simulate-funktiota, shallow:lla on
    -> shallow ilmeisesti renderöi vain ylimmän komponentin eli
    alla componen sisältää pelkän themewrapperin
    -> toisaalta question ei renderaa ilman theme wrappia koska ei löydä themea
      eli vaatinee opiskelua. koitin tehdä myös react testing librarylla joka oli
      full stackissa mutta sekään ei jostain syystä toimi samalla tavalla kuin
      fs matskussa.

      ps it.only on hyvä ajaa vain tämän testin.
    const question = shallow(
      <Question questions={questions} />,
    )
    const component = shallow(
      <ThemeWrapper>
        {question}
      </ThemeWrapper>,
    )

    question.debug()
    const mockHandler = jest.fn()
    const link = question.find('a')
    link.simulate('click')

    //expect(mockHandler.mock.calls).toHaveLength(1)
    expect(component.getBytext()).toContain('Maistuisiko laskiaispulla?')
    */
  })
})
