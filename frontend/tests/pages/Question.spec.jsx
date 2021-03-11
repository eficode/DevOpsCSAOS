/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { useStore } from '../../store'

import Question from '../../pages/survey/questions/question'
import ThemeWrapper from '../testutils/themeWrapper'
import { questions } from '../testutils/mockQuestions'

nextRouter.useRouter = jest.fn()

describe('Question rendering', () => {
  beforeEach(() => {
    const currentState = useStore.getState()
    useStore.setState({
      ...currentState,
      questions: questions,
    })

    useRouter.mockImplementation(() => ({
      route: '/survey/questions/question/?id=1',
      pathname: 'survey/questions/question/?id=1',
      query: { id: '1' },
      asPath: '',
    }))
  })

  it('Component is rendered', () => {
    render(
      <ThemeWrapper>
        <Question />
      </ThemeWrapper>
    )
    expect(screen.getByText('DevOps Assessment Tool')).toBeInTheDocument()
  })

  it('The question whose id is in route is rendered', () => {
    render(
      <ThemeWrapper>
        <Question />
      </ThemeWrapper>
    )
    expect(screen.getByText('Oletko ruisleipä?'))
  })

  it('The right "Question q_id/survey_length" params are rendered', () => {
    render(
      <ThemeWrapper>
        <Question />
      </ThemeWrapper>
    )
    expect(
      screen.getByText(`Question 1/${questions.length}`)
    ).toBeInTheDocument()
  })
})

describe('Navigation button conditional rendering', () => {
  beforeEach(() => {
    const currentState = useStore.getState()
    useStore.setState({
      ...currentState,
      questions: questions,
    })
  })

  it('Mid-survey question renders links with texts Back and Next', () => {
    useRouter.mockImplementation(() => ({
      route: '/survey/questions/question/?id=2',
      pathname: 'survey/questions/question/?id=2',
      query: { id: '2' },
      asPath: '',
    }))

    render(
      <ThemeWrapper>
        <Question />
      </ThemeWrapper>
    )

    expect(screen.queryByText('Previous')).toBeInTheDocument()
  })

  it('Last question renders link with text Back and link to summary', () => {
    useRouter.mockImplementation(() => ({
      route: '/survey/questions/question/?id=3',
      pathname: 'survey/questions/question/?id=3',
      query: { id: '3' },
      asPath: '',
    }))

    render(
      <ThemeWrapper>
        <Question />
      </ThemeWrapper>
    )

    expect(screen.queryByText('Previous')).toBeInTheDocument()
    expect(screen.queryByText('Review')).toBeInTheDocument()
  })
})

describe('Selecting option', () => {
  beforeEach(() => {
    const currentState = useStore.getState()
    useStore.setState({
      ...currentState,
      questions: questions,
    })
  })

  it('Clicking option changes selection in state', () => {
    render(
      <ThemeWrapper>
        <Question />
      </ThemeWrapper>
    )

    const initialState = useStore.getState()

    expect(initialState.selections[2]).toBe(undefined)

    const button = screen.getByRole('button', { name: 'Agree' })
    userEvent.click(button)

    const stateAfterClick = useStore.getState()
    expect(stateAfterClick.selections[2]).toBe(3)
  })
})
