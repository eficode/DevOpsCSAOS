/* eslint-disable no-undef */
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { useStore } from '../../src/store'

import Summary from '../../src/pages/survey/questions/summary'
import ThemeWrapper from '../testutils/themeWrapper'
import { initializedSelections, changeSelections } from '../testutils/utils'
import { questions } from '../testutils/testdata'

nextRouter.useRouter = jest.fn()

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    THIS_NEEDS_TO_BE_SOMETHING: 'something'
  }
}))

beforeEach(() => {
  useStore.setState({ questions, selections: initializedSelections })
})

describe('Component rendering', () => {
  useRouter.mockImplementation(() => ({
    route: '/survey/summary/',
    pathname: 'survey/summary',
    asPath: '',
  }))

  it('Component is rendered', () => {
    render(
      <ThemeWrapper>
        <Summary />
      </ThemeWrapper>,
    )
    expect(
      screen.getByText('Here are your current answers'),
    ).toBeInTheDocument()
  })
})

describe('Answer summary listing', () => {
  it('Summary page lists all questions', () => {
    render(
      <ThemeWrapper>
        <Summary />
      </ThemeWrapper>,
    )

    questions.forEach((q) => {
      expect(screen.getByText(`${q.id}. ${q.text}`)).toBeInTheDocument()
    })
  })

  it('Current answers are listed on page', () => {
    render(
      <ThemeWrapper>
        <Summary />
      </ThemeWrapper>,
    )

    act(() => {
      useStore.setState({
        selections: changeSelections([101, 202, undefined, 401, 501]),
      })
    })
    
    expect(screen.getByRole('link', { name: `1. ${questions[0].text}` }).closest('article')).toHaveTextContent(
      'You answered: Strongly agree',
    )

    expect(screen.getByRole('link', { name: `2. ${questions[1].text}`}).closest('article')).toHaveTextContent(
      'You answered: En tiiä ehkä huomenna',
    )

    expect(screen.getByRole('link', { name: `3. ${questions[2].text}` }).closest('article')).toHaveTextContent(
      "Click the question to answer.",
    )

    expect(screen.getByRole('link', { name: `4. ${questions[3].text}` }).closest('article')).toHaveTextContent(
      'You answered: Jooooo',
    )

    expect(screen.getByRole('link', { name: `5. ${questions[4].text}` }).closest('article')).toHaveTextContent(
      'You answered: Yes',
    )


  })
})

describe('Sending answers', () => {
  it('Cannot send answers without answering all questions', () => {
    render(
      <ThemeWrapper>
        <Summary />
      </ThemeWrapper>,
    )
    act(() => {
      useStore.setState({
        selections: changeSelections([
          101,
          undefined,
          undefined,
          402,
          undefined,
        ]),
      })
    })



    const button = screen.getByRole('button', { name: 'Submit answers' })
    expect(screen.queryByText('Please answer all questions to continue.')).not.toBeInTheDocument()
    userEvent.click(button)
    expect(screen.queryByText('Please answer all questions to continue.')).toBeInTheDocument()
  })

  it('Able to send answers after all questions answered', () => {
    render(
      <ThemeWrapper>
        <Summary />
      </ThemeWrapper>,
    )

    const selectionsOfQuestions = [102, 201, 301, 401, 501]
    global.alert = jest.fn()
    act(() => {
      useStore.setState({ selections: changeSelections(selectionsOfQuestions) })
    })

    const button = screen.getByRole('button', { name: 'Submit answers' })
    userEvent.click(button)
    expect(global.alert).toHaveBeenCalledTimes(0)
  })
})
