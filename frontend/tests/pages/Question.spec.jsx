/* eslint-disable no-undef */
import React from 'react'
import {
  render, screen, fireEvent, act,
} from '@testing-library/react'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { useStore } from '../../store'

import Question from '../../pages/survey/questions/[questionId]'
import ThemeWrapper from '../testutils/themeWrapper'
import { questions } from '../testutils/constants'

nextRouter.useRouter = jest.fn()

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

    expect(component.container).toHaveTextContent('DevOps Assessment Tool')
  })

  it('The question whose id is in route is rendered', () => {
    const component = render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>,
    )
    expect(component.container).toHaveTextContent('Oletko ruisleipä?')
  })

  it('The right "Question q_id/survey_length" params are rendered', () => {
    const component = render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>,
    )
    expect(component.container).toHaveTextContent('Question 1/2')
  })
})

describe('Navigation button conditional rendering', () => {
  it('Not last question renders link with text Next', () => {
    const component = render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>,
    )

    expect(component.container).toHaveTextContent('Next')
  })

  it('Last question renders link with correct link label', () => {
    useRouter.mockImplementation(() => ({
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

    expect(component.container).toHaveTextContent('Go to answer summary')
  })
})

describe('Selecting option', () => {
  it('Clicking option changes selection in state', () => {
    const component = render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>,
    )

    const initialState = useStore.getState()

    expect(initialState.selections[1]).toBe(-1)

    const button = component.getByText('Agree')
    fireEvent.click(button)

    const stateAfterClick = useStore.getState()
    expect(stateAfterClick.selections[1]).toBe(4)
  })
})

describe('End of survey', () => {
  it('Cannot send answers without answering all questions', () => {
    useRouter.mockImplementation(() => ({
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
    act(() => {
      useStore.setState({ selections: [1, -1] })
    })

    global.alert = jest.fn()

    const button = component.getByText('Go to answer summary')
    fireEvent.click(button)
    expect(global.alert).toHaveBeenCalledTimes(1)
    fireEvent.click(button)
    expect(global.alert).toHaveBeenCalledTimes(2)
  })

  it('Able to send answers after all questions answered', () => {
    useRouter.mockImplementation(() => ({
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
    global.alert = jest.fn()
    act(() => {
      useStore.setState({ selections: [1, 1] })
    })

    const button = component.getByText('Go to answer summary')
    fireEvent.click(button)
    expect(global.alert).toHaveBeenCalledTimes(0)
  })
})
