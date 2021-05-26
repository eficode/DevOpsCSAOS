/* eslint-disable no-undef */
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { useStore } from '../../store'

import Summary from '../../pages/survey/questions/summary'
import ThemeWrapper from '../testutils/themeWrapper'
import { initializedSelections, changeSelections } from '../testutils/utils'
import { questions } from '../testutils/testdata'

nextRouter.useRouter = jest.fn()

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
      expect(screen.getByText(q.text)).toBeInTheDocument()
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
    
    expect(screen.getByRole('link', { name: questions[0].text }).closest('article')).toHaveTextContent(
      'You answered: Strongly agree',
    )

    expect(screen.getByRole('link', { name: questions[1].text }).closest('article')).toHaveTextContent(
      'You answered: En tiiä ehkä huomenna',
    )

    expect(screen.getByRole('link', { name: questions[2].text }).closest('article')).toHaveTextContent(
      "You haven't answered this question.",
    )

    expect(screen.getByRole('link', { name: questions[3].text }).closest('article')).toHaveTextContent(
      'You answered: Jooooo',
    )

    expect(screen.getByRole('link', { name: questions[4].text }).closest('article')).toHaveTextContent(
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

    global.alert = jest.fn()

    const button = screen.getByRole('button', { name: 'Submit answers' })
    userEvent.click(button)
    expect(global.alert).toHaveBeenCalledTimes(1)
    userEvent.click(button)
    expect(global.alert).toHaveBeenCalledTimes(2)
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
