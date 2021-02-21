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
    render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>
    )
    expect(screen.getByText('DevOps Assessment Tool')).toBeInTheDocument()
  })

  it('The question whose id is in route is rendered', () => {
    render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>
    )
    expect(screen.getByText('Oletko ruisleipä?'))
  })

  it('The right "Question q_id/survey_length" params are rendered', () => {
    render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>
    )
    expect(screen.getByText('Question 1/2')).toBeInTheDocument()
  })
})

describe('Navigation button conditional rendering', () => {
  it('Not last question renders link with text Next', () => {
    render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>
    )
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('Last question renders link with correct link label', () => {
    useRouter.mockImplementation(() => ({
      route: '/survey/questions/2',
      pathname: 'survey/questions/2',
      query: { questionId: '2' },
      asPath: '',
    }))

    render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>
    )
    
    expect(screen.getByRole('button', { name: 'Review' })).toBeInTheDocument()
  })
})

describe('Selecting option', () => {
  it('Clicking option changes selection in state', () => {
    render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>
    )

    const initialState = useStore.getState()

    expect(initialState.selections[1]).toBe(undefined)

    const button = screen.getByRole('button', { name: 'Agree' })
    userEvent.click(button)

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

    render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>
    )
    act(() => {
      useStore.setState({ selections: [1, undefined] })
    })

    global.alert = jest.fn()

    const button = screen.getByRole('button', { name: 'Review' })
    userEvent.click(button)
    expect(global.alert).toHaveBeenCalledTimes(1)
    userEvent.click(button)
    expect(global.alert).toHaveBeenCalledTimes(2)
  })

  it('Able to send answers after all questions answered', () => {
    useRouter.mockImplementation(() => ({
      route: '/survey/questions/2',
      pathname: 'survey/questions/2',
      query: { questionId: '2' },
      asPath: '',
    }))

    render(
      <ThemeWrapper>
        <Question questions={questions} />
      </ThemeWrapper>
    )
    global.alert = jest.fn()
    act(() => {
      useStore.setState({ selections: [1, 1] })
    })

    const button = screen.getByRole('button', { name: 'Review' })
    userEvent.click(button)
    expect(global.alert).toHaveBeenCalledTimes(0)
  })
})
