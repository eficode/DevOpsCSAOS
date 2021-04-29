/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { useStore } from '../../store'
import ThemeWrapper from '../testutils/themeWrapper'
import TotalResultsPage from '../../pages/survey/total_results'
import { detailedResults } from '../testutils/testdata'

nextRouter.useRouter = jest.fn()
jest.mock('react-d3-speedometer', () => () => 'gauge')

describe('Category-based result texts', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      route: 'survey/total_results/',
      pathname: 'survey/total_results/',
      asPath: '',
    }))

    useStore.setState({
      results: {
        detailedResults,
      },
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

  it('Toggle A renders bar chart', () => {
    useStore.setState({
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

  it('Toggle B renders radar chart', () => {
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
    expect(document.getElementById('RadarChartContainer')).toBeInTheDocument()
  })
})
