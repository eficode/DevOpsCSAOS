/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { useStore } from '../../src/store'
import ThemeWrapper from '../testutils/themeWrapper'
import TotalResultsPage from '../../src/pages/survey/total_results'
import { detailedResults } from '../testutils/testdata'

nextRouter.useRouter = jest.fn()
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    THIS_NEEDS_TO_BE_SOMETHING: 'something'
  }
}))

describe('Category-based result texts', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      route: 'survey/total_results/',
      pathname: 'survey/total_results/',
      asPath: '',
    }))

    useStore.setState({
      detailedResults
    })
  })

  it('Page is rendered', () => {
    render(
      <ThemeWrapper>
        <TotalResultsPage />
      </ThemeWrapper>
    )
    expect(screen.queryByText('Your Results')).toBeInTheDocument()
  })

  it('Category name, points and a result text is rendered for each category', () => {
    render(
      <ThemeWrapper>
        <TotalResultsPage />
      </ThemeWrapper>
    )

    detailedResults.categoryResults.forEach((category) => {
      expect(screen.getByTestId('categorycontainer')).toHaveTextContent(
        `${category.name} ${category.userPoints} / ${category.maxPoints}`
      )
      expect(screen.getByTestId('categorycontainer')).toHaveTextContent(
        category.description
      )
      expect(screen.getByTestId('categorycontainer')).toHaveTextContent(
        category.text
      )
    })
  })
})

describe('Chart rendering', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      route: 'survey/total_results/',
      pathname: 'survey/total_results/',
      asPath: '',
    }))
  })

  it('Toggle B renders bar chart', () => {
    useStore.setState({
      featureToggleSwitch: 'B',
      results: {
        detailedResults,
      },
    })
    render(
      <ThemeWrapper>
        <TotalResultsPage />
      </ThemeWrapper>
    )
    expect(document.getElementById('BarChartContainer')).toBeInTheDocument()
  })

  it('Toggle A renders radar chart', () => {
    useStore.setState({
      featureToggleSwitch: 'A',
      results: {
        detailedResults,
      },
    })
    render(
      <ThemeWrapper>
        <TotalResultsPage />
      </ThemeWrapper>
    )
    expect(document.getElementById('RadarChartContainer')).toBeInTheDocument()
  })
})
