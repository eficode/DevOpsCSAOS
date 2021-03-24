/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { useStore } from '../../store'

import SurveyPage from '../../pages/survey/questions/index'
import ThemeWrapper from '../testutils/themeWrapper'
import { questions, initializedSelections, initializedQuestionGroups } from '../testutils/utils'

nextRouter.useRouter = jest.fn()

beforeEach(() => {
  useStore.setState({
    questions,
    questionGroups: initializedQuestionGroups,
    selections: initializedSelections,
  })
})

describe('Question rendering', () => {
  // initial q groups: 3 pages with 2 questions each
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      route: '/survey/questions/?id=1',
      pathname: 'survey/questions/?id=1',
      query: { id: '1' },
      asPath: '',
    }))
  })

  it('Component is rendered', () => {
    render(
      <ThemeWrapper>
        <SurveyPage />
      </ThemeWrapper>
    )
    expect(screen.getByText('DevOps Assessment Tool')).toBeInTheDocument()
  })

  it('The question whose id is in route is rendered', () => {
    render(
      <ThemeWrapper>
        <SurveyPage />
      </ThemeWrapper>
    )
    expect(screen.getByText('Oletko ruisleipä?'))
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

  it('Not last question renders only link with text Next', () => {
    render(
      <ThemeWrapper>
        <SurveyPage />
      </ThemeWrapper>
    )
    //.not. does not work with getByText
    expect(screen.queryByText('Next')).toBeInTheDocument()
    expect(screen.queryByText('Previous')).not.toBeInTheDocument()
  })

  it('Mid-survey question renders links with texts Back and Next', () => {
    useRouter.mockImplementation(() => ({
      route: '/survey/questions/?id=2',
      pathname: 'survey/questions/?id=2',
      query: { id: '2' },
      asPath: '',
    }))
    

    render(
      <ThemeWrapper>
        <SurveyPage />
      </ThemeWrapper>
    )

    expect(screen.queryByText('Next')).toBeInTheDocument()
    expect(screen.queryByText('Previous')).toBeInTheDocument()
  })

  it('Last question renders link with text Back and link to summary', () => {
    useRouter.mockImplementation(() => ({
      route: '/survey/questions/?id=3',
      pathname: 'survey/questions/?id=3',
      query: { id: '3' },
      asPath: '',
    }))

    render(
      <ThemeWrapper>
        <SurveyPage />
      </ThemeWrapper>
    )

    expect(screen.queryByText('Next')).not.toBeInTheDocument()
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
    useRouter.mockImplementation(() => ({
      route: '/survey/questions/?id=1',
      pathname: 'survey/questions/?id=1',
      query: { id: '1' },
      asPath: '',
    }))

    render(
      <ThemeWrapper>
        <SurveyPage />
      </ThemeWrapper>
    )

    const initialState = useStore.getState()

    expect(initialState.selections[0].value).toBe(undefined)

    const button = screen.getAllByRole('button', { name: 'Agree' })[0]
    userEvent.click(button)

    const stateAfterClick = useStore.getState()
    expect(stateAfterClick.selections[0].value).toBe(3)
  })
})
