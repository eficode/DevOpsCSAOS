/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { useStore, divideQuestions } from '../../src/store'

import SurveyPage from '../../src/pages/survey/questions/index'
import ThemeWrapper from '../testutils/themeWrapper'
import {
  initializedSelections,
  initializedQuestionGroups,
} from '../testutils/utils'
import { questions } from '../testutils/testdata'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    THIS_NEEDS_TO_BE_SOMETHING: 'something'
  }
}))

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
      </ThemeWrapper>,
    )
    expect(screen.getByText('DevOps Self Assessment')).toBeInTheDocument()
  })

  it('First page contains first two questions', () => {
    render(
      <ThemeWrapper>
        <SurveyPage />
      </ThemeWrapper>,
    )
    expect(screen.getByText('Oletko ruisleipä?'))
    expect(screen.getByText('Maistuisiko laskiaispulla?'))
  })
})

describe('Navigation button conditional rendering', () => {
  beforeEach(() => {
    const currentState = useStore.getState()
    useStore.setState({
      ...currentState,
      questions,
    })
  })

  it('Not last question renders only link with text Next', () => {
    render(
      <ThemeWrapper>
        <SurveyPage />
      </ThemeWrapper>,
    )
    // .not. does not work with getByText
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
      </ThemeWrapper>,
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
      </ThemeWrapper>,
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
      questions,
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
      </ThemeWrapper>,
    )

    const initialState = useStore.getState()

    expect(initialState.selections[0].answerId).toBe(undefined)

    const idOfAgreeButton = 102
    const button = screen.getAllByRole('button', { name: 'Agree' })[0]
    userEvent.click(button)

    const stateAfterClick = useStore.getState()
    expect(stateAfterClick.selections[0].answerId).toBe(idOfAgreeButton)
  })
})

describe('Feature toggle B', () => {
  beforeEach(() => {
    const {
      initialSelectionsWithQuestionIds,
      chunkedQuestions,
    } = divideQuestions(questions, 'A')
    useStore.setState({
      questions,
      selections: initialSelectionsWithQuestionIds,
      questionGroups: chunkedQuestions,
    })
    useRouter.mockImplementation(() => ({
      route: '/survey/questions/?id=1',
      pathname: 'survey/questions/?id=1',
      query: { id: '1' },
      asPath: '',
    }))
  })

  it('First page contains only one question', () => {
    render(
      <ThemeWrapper>
        <SurveyPage />
      </ThemeWrapper>,
    )
    expect(screen.getByText('Oletko ruisleipä?'))
    expect(
      screen.queryByText('Maistuisiko laskiaispulla?'),
    ).not.toBeInTheDocument()
  })
})
