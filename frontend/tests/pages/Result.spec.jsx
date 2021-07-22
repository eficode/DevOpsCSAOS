/* eslint-disable no-undef */
import React, { useState } from 'react'
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
    industries: [
      {
        "name": "Operating systems",
        'id': 1
      },
      {
        "name": "Integrated systems",
        'id': 2
      },
      {
        "name": "Applications",
        'id': 3
      },
      {
        "name": "Mobile applications",
        'id': 4
      },
      {
        "name": "Games",
        'id': 5
      },
      {
        "name": "Information security",
        'id': 6
      },
      {
        "name": "Platforms",
        'id': 7
      }
    ]    
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

  it('Page is rendered', async () => {
    render(
      <ThemeWrapper>
        <ResultPage />
      </ThemeWrapper>,
    )
    expect(screen.queryByText('Your Results')).toBeInTheDocument()
  })

  it('Points are displayed correctly', async () => {
    render(
      <ThemeWrapper>
        <ResultPage />
      </ThemeWrapper>,
    )
    expect(screen.queryByText('65 / 100')).toBeInTheDocument()
  })

  it('User survey result text is rendered', async () => {
    render(
      <ThemeWrapper>
        <ResultPage />
      </ThemeWrapper>,
    )
    expect(screen.queryByText('You are a Pulla.')).toBeInTheDocument()
  })

  it('Page lists all categories, category with best and worst points in result summary', async () => {
    render(
      <ThemeWrapper>
        <ResultPage />
      </ThemeWrapper>,
    )
    expect(screen.getByTestId('category-list')).toHaveTextContent(
      'Highest Score',
    )

    expect(screen.getByTestId('category-list')).toHaveTextContent(
      'Lowest Score',
    )
  })
})
