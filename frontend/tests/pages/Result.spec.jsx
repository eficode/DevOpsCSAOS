/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { useStore } from '../../src/store'
import ThemeWrapper from '../testutils/themeWrapper'
import ResultPage from '../../src/pages/survey/result'

nextRouter.useRouter = jest.fn()

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    THIS_NEEDS_TO_BE_SOMETHING: 'something'
  }
}))

beforeEach(() => {
  useStore.setState({
    results: {
      surveyResult: {
        maxPoints: 100,
        userPoints: 65,
        text: 'You are a Pulla.',
      },
      categories: ['Jauhot', 'Leivat', 'Leivonnaiset'],
      userBestInCategory: 'Leivat',
      userWorstInCategory: 'Jauhot',
    },
  })
})

describe('Top of page contains survey points and summary text of result', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      route: 'survey/result/',
      pathname: 'survey/result',
      asPath: '',
    }))
  })

  it('Page is rendered', () => {
    render(
      <ThemeWrapper>
        <ResultPage />
      </ThemeWrapper>,
    )
    expect(screen.queryByText('Your Results')).toBeInTheDocument()
  })

  it('Points are displayed correctly', () => {
    render(
      <ThemeWrapper>
        <ResultPage />
      </ThemeWrapper>,
    )
    expect(screen.queryByText('65/100')).toBeInTheDocument()
  })

  it('User survey result text is rendered', () => {
    render(
      <ThemeWrapper>
        <ResultPage />
      </ThemeWrapper>,
    )
    expect(screen.queryByText('You are a Pulla.')).toBeInTheDocument()
  })

  it('Page lists all categories, category with best and worst points in result summary', () => {
    render(
      <ThemeWrapper>
        <ResultPage />
      </ThemeWrapper>,
    )
    expect(screen.getByTestId('summarytext')).toHaveTextContent(
      'Your highest score was in the category',
    )

    expect(screen.getByTestId('summarytext')).toHaveTextContent(
      'whereas you scored lowest in',
    )
  })
})
