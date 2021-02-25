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

import Summary from '../../pages/survey/questions/summary'
import ThemeWrapper from '../testutils/themeWrapper'
import { questions } from '../testutils/mockQuestions'

nextRouter.useRouter = jest.fn()

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
    expect(screen.getByText('Here are your current answers')).toBeInTheDocument()
  })
})

describe('Answer summary listing', () => {
  it('Summary page lists all questions', () => {
    render(
      <ThemeWrapper>
        <Summary />
      </ThemeWrapper>,
    )
    act(() => {
      useStore.setState({questions})
    })
    
    questions.forEach(q => {
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
      useStore.setState({ questions })
      useStore.setState({ selections: [-1, 2, 4]})
    })

    expect(screen.getByText(questions[0].text)).toHaveTextContent("You haven't answered this question")
    expect(screen.getByText(questions[1].text)).toHaveTextContent('You feel neutral')
    expect(screen.getByText(questions[2].text)).toHaveTextContent('You strongly agree')
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
      useStore.setState({ selections: [1] })
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
    
    global.alert = jest.fn()
    act(() => {
      useStore.setState({ selections: new Array(questions.length).fill(1) })
    })

    const button = screen.getByRole('button', { name: 'Submit answers' })
    userEvent.click(button)
    expect(global.alert).toHaveBeenCalledTimes(0)
  })
})